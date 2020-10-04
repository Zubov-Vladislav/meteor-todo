/** @jsx jsx */
import jsx from 'jsx-native-events';
import React from 'react';
import { trueAttrs } from "../../../../helpers/attrebutes";
import T from 'prop-types'

const Task = ({ task, onCheckboxClick, onDeleteClick }) => (
  <nu-card
    shadow='.2'
  >
    <nu-flex
      gap
      content='space-between'
      items='center'
    >
      <nu-flex
        gap='1x'
        items='center'
        content='flex-start'
      >
        <nu-checkbox
          {...trueAttrs({ checked: task.checked })}
          // checked={!!task.checked}
          border='1bw #999999'
          onEventTap={() => onCheckboxClick(task)}
        />
        <span>{task.text}</span>
      </nu-flex>
      <nu-btn onEventTap={() => onDeleteClick(task)} fill='hue(320 special)' color='special-text'>Delete</nu-btn>
    </nu-flex>
  </nu-card>

);

Task.propTypes = {
  task: T.shape({
    _id: T.oneOfType([
      T.string,
      T.number
    ]),
    checked: T.bool,
    text: T.string,
    userId: T.oneOfType([
      T.string,
      T.number
    ]),
  }),
  onCheckboxClick: T.func.isRequired,
  onDeleteClick: T.func.isRequired
}

export default Task
