import React, { FormEvent, useState } from 'react';
import { login } from '../service';
import { NavLink, useNavigate } from 'react-router-dom';
import { encrypt } from '../util';


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendForm = (evt: FormEvent) => {
    evt.preventDefault();
    login(email, password)
      .then((res) => {
        const stData = JSON.stringify(res.data);
        const cipherText = encrypt(stData);
        sessionStorage.setItem('user', cipherText);
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
        alert('Username or Password Fail!');
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={sendForm}>
          <div className="mb-3">
            <input
              required
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control input-field"
              placeholder="E-mail"
            ></input>
          </div>
          <div className="mb-3">
            <input
              required
              type="password"
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control input-field"
              placeholder="Password"
            ></input>
          </div>
          <button className="btn btn-success login-button">Send</button>
        </form>
        <NavLink to={'/register'} className="btn btn-primary register-button">
          Register
        </NavLink>
      </div>
    </div>
  );
}

export default Login;