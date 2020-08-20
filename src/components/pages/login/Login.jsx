import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  Link,
  useToast,
  Image,
  Grid,
  Text,
} from '@chakra-ui/core';

function Login({ setShowview, setUser }) {
  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
  });

  // funciones
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const loguearUsuario = async (e) => {
    e.preventDefault();
    try {
      const url = '/login';
      const res = await axios.post(url, usuario);
      const data = res.data;
      getToast('success', res.data.message);
      setUser(data.results);
      setShowview('task');
    } catch (err) {
      console.log(err);
      let error = 'los datos ingresados son icorrectos';
      getToast('warning', error);
    }
  };

  const changePage = () => {
    setShowview('register');
  };
  const toast = useToast();
  const getToast = (type, message) => {
    toast({
      position: 'top-right',
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };
  const { email, password } = usuario;
  return (
    <Grid
      templateColumns={['1fr', '1fr', '3fr 2fr']}
      backgroundColor='#006064'
      mx={2}
      borderRadius='lg'
      overflow='hidden'
      minWidth='100%'
    >
      <Box>
        <Image
          size='full'
          objectFit='cover'
          src='https://placeimg.com/680/340/tech'
        />
      </Box>
      <Box>
        <Text
          letterSpacing='wide'
          fontFamily='Poppins'
          textAlign='center'
          fontSize='xl'
          color='teal.100'
          pt={2}
        >
          INICIAR SESIÓN
        </Text>

        <Box color='#CFD8DC' as='form' onSubmit={loguearUsuario} px={4} py={4}>
          <FormControl>
            <FormLabel htmlFor='email'>usuario:</FormLabel>
            <Input
              color='#263238'
              type='email'
              id='email'
              placeholder='ingresa tu email'
              name='email'
              onChange={handleChange}
              value={email}
              mb={2}
              focusBorderColor='teal.400'
              isRequired
            />
            <FormLabel htmlFor='password'>contraseña:</FormLabel>
            <Input
              id='password'
              color='#263238'
              type='password'
              placeholder='ingresa tu contraseña'
              name='password'
              onChange={handleChange}
              value={password}
              mb={2}
              focusBorderColor='teal.400'
              isRequired
            />
            <Button
              type='submit'
              color='whatsapp.100'
              rightIcon='check'
              variantColor='whatsapp'
              letterSpacing='wider'
              my={2}
              width='full'
            >
              Ingresar
            </Button>
            <Box textAlign='center'>
              si no tienes una cuenta (
              <Link color='whatsapp.500' onClick={changePage}>
                REGISTRATE
              </Link>
              )
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Grid>
  );
}

export default Login;
