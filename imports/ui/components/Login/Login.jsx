/** @jsx jsx */
import jsx from 'jsx-native-events';
import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";
import FormField from "../FormField";
import Button from "../Button";

const initialUser = {
  username: '',
  password: ''
}

const Login = ({history}) => {
  const [ { username, password }, setUser ] = useState(initialUser)
  
  
  const onChangeField = (fieldName) => ({ target: { value } }) => {
    setUser(user => ( {
      ...user,
      [fieldName]: value
    } ))
  }
  
  const submitHandler = async () => {
    if (password && username) {
      await Meteor.loginWithPassword(username, password);
      history.push('/')
    }
  }
  
  return <nu-flex
    height='100vh'
    content='center'
    items='center'
    fill='special'
    image="linear(345deg, hue(280 special), hue(320 special))"
  >
    <nu-card
      width='50x'
      gap='2x'
      shadow='10'
    >
      <nu-theme hue="280"/>
      <nu-h1>Login</nu-h1>
      <nu-props radius=".5x"/>
      <nu-form>
        
        <FormField
          placeholder='Username'
          name='username'
          value={username}
          onInput={onChangeField('username')}/>
        <FormField
          placeholder='Password'
          type='password'
          value={password}
          onInput={onChangeField('password')}/>
        <nu-flex
          content='flex-end'
        >
          <Button
            onClick={submitHandler}
            onKey={submitHandler}
            special
          >Login</Button>
        </nu-flex>
      </nu-form>
    
    </nu-card>
  </nu-flex>
  
  
}
export default Login
