import React, { useState } from 'react';
import Task from './components/pages/task/Task';
import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';
import { ThemeProvider, CSSReset, theme, Box } from '@chakra-ui/core';

function App() {
  const [user, setUser] = useState({});
  const [showview, setShowview] = useState('login');

  switch (showview) {
    case 'task':
      return (
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Box
            maxW='1200px'
            mx='auto'
            display='flex'
            alignItems='center'
            minH='100vh'
            justifyContent='center'
          >
            <Task user={user} />
            {/* <Task idUser='5f19b4e885a0e3001745878c' /> */}
          </Box>
        </ThemeProvider>
      );
    case 'register':
      return (
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Box
            maxW='1200px'
            mx='auto'
            display='flex'
            alignItems='center'
            minH='100vh'
            justifyContent='center'
          >
            <Register setShowview={setShowview} setUser={setUser} />
          </Box>
        </ThemeProvider>
      );
    case 'login':
      return (
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Box
            maxW='1200px'
            mx='auto'
            display='flex'
            alignItems='center'
            minH='100vh'
            justifyContent='center'
          >
            <Login setShowview={setShowview} setUser={setUser} />
          </Box>
        </ThemeProvider>
      );
    default:
  }
}
export default App;
