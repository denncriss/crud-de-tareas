import React, { useState } from 'react';
import './App.scss';
import Task from './components/pages/task/Task';
import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';

function App() {
  const [user, setUser] = useState({});
  const [showview, setShowview] = useState('login');
  const [message, setMessage] = useState({});

  const changeMessage = (message) => {
    setMessage(message);
  };
  const changeUser = (user) => {
    setUser(user);
  };
  const changeShowview = (page) => {
    setShowview(page);
  };
  switch (showview) {
    case 'task':
      return (
        <div className='container'>
          <Task user={user} />
          {/* <Task idUser='5f19b4e885a0e3001745878c' /> */}
        </div>
      );
    case 'register':
      return (
        <div className='container'>
          <Register
            changeMessage={changeMessage}
            changeShowview={changeShowview}
            changeUser={changeUser}
          />
        </div>
      );
    case 'login':
      return (
        <div className='container'>
          <Login
            changeMessage={changeMessage}
            changeShowview={changeShowview}
            changeUser={changeUser}
          />
        </div>
      );
    default:
  }
}
export default App;
