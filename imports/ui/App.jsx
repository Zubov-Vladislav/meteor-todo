import React, { useEffect, useState } from 'react';
import Main from './components/Main';
import Login from "./components/Login/Login";
import { useTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import '../api/methods/tasksMethods';


export const App = () => {
  
  const [ isNumlLoaded, setIsNumlLoaded ] = useState(false)
  
  const isUser = useTracker(() => {
    const user = Meteor.user()
    const id = Meteor.userId();
    return !!user || !!id
  });
  
  useEffect(() => {
    function loadScript(cb) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://cdn.jsdelivr.net/npm/numl@1.0.0-beta.1/dist/index.js';
      script.async = true;
      document.body.appendChild(script);
      if (cb) script.addEventListener('load', cb, false)
      return script
    }
    const setLoaded = () => setIsNumlLoaded(true)
    const script = loadScript(setLoaded);
    
    return () => script.removeEventListener('load', setLoaded, true)
  }, [])
  
  if (isNumlLoaded) return (
    <Router>
      <Switch>
        {isUser && <Redirect from='/login' to='/'/>}
        
        <Route exact path='/login' component={Login}/>
        
        <WithUser
          isUser={isUser}
        >
          <Route exact path='/' component={Main}/>
        </WithUser>
      </Switch>
    </Router>
  )
  return <h1>Loading...</h1>
}

const WithUser = ({ isUser, children }) => {
  if (isUser) return children
  return <Redirect from='/*' to="/login"/>
}
