import React, { useState, useMemo } from 'react';
import { Meteor } from 'meteor/meteor'
import Task from '../Task';
import { useTracker } from 'meteor/react-meteor-data';
import TaskCollection from '../../../db/collections/TaskCollection';
import TaskForm from "../TaskForm";
import Filter from "../Filter";

const toggleChecked = ({ _id, checked }) => {
  Meteor.call('tasks.setChecked', _id, !checked)
}
const handleDelete = ({ _id }) => {
  Meteor.call('tasks.remove', _id)
}

const hideCompletedFSelector = (isHidden) => isHidden ? { checked: { $ne: true } } : {};

const Main = () => {
  const [ isHidden, setHidden ] = useState(false)
  
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};
  
  const pendingOnlyFilter = useMemo(() => (
    {
      ...hideCompletedFSelector(isHidden),
      ...userFilter
    }
  ), [ isHidden, userFilter ]);
  
  
  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user) return noDataAvailable;
    
    const handler = Meteor.subscribe('tasks');
    
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true }
    }
    
    const tasks = TaskCollection.find(
      pendingOnlyFilter,
      {
        sort: { createdAt: -1 }
      }
    ).fetch()
    
    const pendingTasksCount = TaskCollection.find(pendingOnlyFilter).count()
    
    return { tasks, pendingTasksCount }
  })
  
  const tasksCount = useTracker(() => {
    if (!user) return 0
    
    return TaskCollection.find(userFilter, { sort: { createdAt: -1 } }).count();
  })
  
  const logout = () => Meteor.logout();
  return <nu-root responsive='1900px|900px|500px'>
    <nu-card
      clear
      fill='special'
      image="linear(345deg, hue(280 special), hue(320 special))"
      color='special-text'
      radius='0'
      shadow='special'
    >
      <nu-flex
        content='space-between'
        items='center'
      >
        <nu-el size='h1||h4'>To Do List ({pendingTasksCount})</nu-el>
        <nu-btn onClick={logout}>Logout</nu-btn>
      </nu-flex>
    
    </nu-card>
    <nu-flex
      flow='column'
      content='center'
      items='center'
      width='100%'
    >
      <nu-main
        padding='1x 2x'
        gap
        width='10x 100% 80x'
      >
        <TaskForm/>
        <nu-theme name='progress' hue="272" saturation="60"/>
        {isLoading && <nu-progressbar theme='progress' value='100'/>}
        {!!tasksCount && <Filter onChangeFilter={setHidden}/>}
        <nu-flow
          flow='column'
          gap
        >
          {
            tasks.map(task => (
              <Task
                key={task._id}
                onCheckboxClick={toggleChecked}
                onDeleteClick={handleDelete}
                task={task}
              />
            ))
          }
        </nu-flow>
      
      </nu-main>
    </nu-flex>
  
  </nu-root>
}

export default Main
