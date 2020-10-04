/** @jsx jsx */
import jsx from 'jsx-native-events';
import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";
import FormField from "../FormField";
import '/imports/api/methods/tasksMethods';


const TaskForm = () => {
  const [ text, setText ] = useState('')
  
  const submitHandler = () => {
    if (text.trim()) {
      Meteor.call('tasks.insert', text)
    }
    setText('')
  }
  
  return <nu-card
    padding
    gap
    shadow='.2'
  >
    <nu-flex
      gap
      content='space-between'
      items='center'
      width='100%'
    >
      <nu-el width='80%'>
        <FormField
          value={text}
          onInput={(e) => setText(e.target.value)}
          grow='1'
          placeholder='Type task...'
          onEnter={submitHandler}
        />
      </nu-el>
      <nu-btn onClick={submitHandler}>Add Task</nu-btn>
    </nu-flex>
  </nu-card>

  
}
export default TaskForm
