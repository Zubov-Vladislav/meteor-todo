import React, { useEffect } from 'react';
import Main from './components/Main';
import Login from "./components/Login/Login";
import { useTracker } from 'meteor/react-meteor-data'
import '../api/methods/tasksMethods';

export const App = () => {
  
  useEffect(() => {
    function loadScript() {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://cdn.jsdelivr.net/npm/numl@1.0.0-beta.1/dist/index.js';
      script.async = true;
      document.body.appendChild(script);
    }
    
    loadScript();
  }, [])
  return (
    <WithUser>
      <Main/>
    </WithUser>
  )
}

const WithUser = ({ children }) => {
  const id = useTracker(() => Meteor.userId())
  if (id) return <>{children}</>
  return <Login/>
}
