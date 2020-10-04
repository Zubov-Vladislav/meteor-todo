/** @jsx jsx */
import React from 'react';
import T from 'prop-types';
import jsx from 'jsx-native-events';

import { attrs, insertText } from '../../../../helpers/attrebutes';

export default function FormField({ onInput, onEnter, label, type, ...props }) {
  
  
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEnter()
    }
  }
  
  const inputProps = {
    onEventInput: onInput,
    onKeyDown: onEnter ? onKeyDown : null,
    ...attrs(props)
  }
  
  
  return <nu-field>
    {label && <nu-label {...insertText(label)}/>}
    {
      type === 'password' ?
        <nu-password {...inputProps}  />
        :
        <nu-input {...inputProps}/>
    }
  </nu-field>
}

FormField.propTypes = {
  onInput: T.func,
  onEnter: T.func,
  label: T.string,
  type: T.oneOf(['password', null, undefined])
};
