import React, { useState, useEffect } from 'react';
import Task from './components/pages/task/Task';
import Register from './components/pages/register/Register';
import Login from './components/pages/login/Login';
import { ThemeProvider, CSSReset, theme, Box, Spinner } from '@chakra-ui/core';

function App() {
  const [user, setUser] = useState({});
  const [showview, setShowview] = useState('login');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

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
            {loading ? (
              <Spinner
                size='xl'
                color='whatsapp.100'
                emptyColor='whatsapp.500'
              />
            ) : (
              <Login setShowview={setShowview} setUser={setUser} />
            )}
          </Box>
        </ThemeProvider>
      );
    default:
  }
}
export default App;
