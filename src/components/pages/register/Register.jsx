import React, { useState } from 'react';
import {
  // Flex,
  // PseudoBox,
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
import axios from 'axios';

function Register({ setShowview, setUser }) {
  const [usuario, setUsuario] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const registrarUsuario = async (e) => {
    e.preventDefault();
    try {
      const url = '/register';
      const res = await axios.post(url, usuario);
      getToast('success', res.data.message);
      setShowview('login');
      setUser(usuario);
    } catch (error) {
      console.log(error);
      const mensaje = 'verifique los datos ingresados';
      getToast('warning', mensaje);
    }
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
  const { name, lastname, email, password } = usuario;
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
          src='https://placeimg.com/680/340/tech/grayscale'
          objectFit='cover'
          size='full'
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
          REGISTRATE
        </Text>

        <Box
          color='#CFD8DC'
          as='form'
          onSubmit={registrarUsuario}
          px={4}
          pb={4}
        >
          <FormControl>
            <FormLabel htmlFor='name'>nombre:</FormLabel>
            <Input
              color='#263238'
              id='name'
              mb={2}
              focusBorderColor='teal.400'
              name='name'
              onChange={handleChange}
              placeholder='nombre'
              type='text'
              value={name}
              isRequired
            />
            <FormLabel htmlFor='lastname'>apellidos:</FormLabel>
            <Input
              color='#263238'
              id='lastname'
              mb={2}
              focusBorderColor='teal.400'
              name='lastname'
              onChange={handleChange}
              placeholder='apellido'
              type='text'
              value={lastname}
              isRequired
            />
            <FormLabel htmlFor='email'>email:</FormLabel>
            <Input
              color='#263238'
              type='email'
              id='email'
              placeholder='ingresa tu email'
              name='email'
              value={email}
              mb={2}
              focusBorderColor='teal.400'
              onChange={handleChange}
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
              Registrar
            </Button>
            <Box textAlign='center'>
              si ya tienes una cuenta (
              <Link color='whatsapp.500' onClick={() => setShowview('login')}>
                INGRESAR
              </Link>
              )
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Grid>
  );
}

export default Register;
