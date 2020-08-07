import React, { useState } from 'react';
import './register.scss';
import axios from 'axios';

function Register({ changeMessage, changeShowview, changeUser }) {
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
      const url = 'https://academlo-todolist.herokuapp.com/register';
      const res = await axios.post(url, usuario);
      console.log(res);
      const mensaje = {
        type: 'success',
        message: res.data.message,
      };
      changeMessage(mensaje);
      setUsuario({
        name: '',
        lastname: '',
        email: '',
        password: '',
      });
      changeShowview('task');
      changeUser(usuario);
    } catch (error) {
      console.log(error);
      const mensaje = {
        type: 'error',
        message: 'verifique los datos ingresados',
      };
      changeMessage(mensaje);
    }
  };
  const changePage = () => {
    changeShowview('login');
  };
  const { name, lastname, email, password } = usuario;
  return (
    <>
      <form onSubmit={registrarUsuario}>
        <input
          name='name'
          onChange={handleChange}
          placeholder='nombre'
          type='text'
          value={name}
        />
        <input
          name='lastname'
          onChange={handleChange}
          placeholder='apellido'
          type='text'
          value={lastname}
        />
        <input
          name='email'
          onChange={handleChange}
          placeholder='email'
          type='email'
          value={email}
        />
        <input
          name='password'
          onChange={handleChange}
          placeholder='contraseña'
          type='password'
          value={password}
        />
        <button type='submit'>registrar</button>
        <button onClick={changePage}>login</button>
      </form>
    </>
  );
}

export default Register;
