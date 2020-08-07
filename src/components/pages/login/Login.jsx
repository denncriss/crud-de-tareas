import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

function Login({ changeMessage, changeShowview, changeUser }) {
  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const loguearUsuario = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://academlo-todolist.herokuapp.com/login';
      const res = await axios.post(url, usuario);
      const data = res.data;
      console.log(res);
      const mensaje = {
        type: 'success',
        message: data.results,
      };
      changeMessage(mensaje);
      changeUser(data.results);
      changeShowview('task');
    } catch (err) {
      console.log(err);
      const mensaje = {
        type: 'error',
        message: 'verifica tu email y tu contraseña',
      };
      changeMessage(mensaje);
    }
  };

  const changePage = () => {
    changeShowview('register');
  };

  const { email, password } = usuario;
  return (
    <div className='card-box'>
      <div className='row'>
        <div className='p-0 col-md-4 card-image'></div>
        <div className='p-0 col-md-8'>
          <div className=''>
            <form onSubmit={loguearUsuario}>
              <input
                className='form-contro'
                name='email'
                onChange={handleChange}
                placeholder='email'
                type='email'
                value={email}
              />
              <input
                className='form-contro'
                name='password'
                onChange={handleChange}
                placeholder='contraseña'
                type='password'
                value={password}
              />
              <button type='submit' className=''>
                ingresar
              </button>
              <button className='' onClick={changePage}>
                registrate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
