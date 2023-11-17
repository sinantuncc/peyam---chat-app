import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../img/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formValidate from '../utils/formValidate';
import { registerRoute } from '../utils/APIRoutes';
import { postData } from '../utils/fetchData';

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(initialValues);
  const { username, email, password } = userData;

  useEffect(() => {
    const currentUser = localStorage.getItem('current-user');

    if (currentUser) navigate('/');
  }, []);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 7500,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = formValidate(userData);

    if (errors) {
      toast.error(errors, toastOptions);
    } else {
      register();
    }
  };

  const register = async () => {
    const form = { username, email, password: password.trim() };
    const result = await postData(registerRoute, form);

    const { data } = result;

    if (data.status) {
      const currentUser = {
        username: data.user.username,
        avatar: data.user.avatar,
        _id: data.user._id,
      };

      localStorage.setItem('current-user', JSON.stringify(currentUser));

      navigate('/setAvatar');
    } else {
      toast.error(data.message, toastOptions);
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='brand'>
            <img src={Logo} alt='logo' />
            <h1>Peyam</h1>
          </div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={(e) => handleChange(e)}
          />

          <button type='submit'>Create User</button>
          <span>
            Already have an account ? <Link to='/login'>Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 2rem 3rem;
    border-radius: 2rem;
    input {
      padding: 1rem;
      border-radius: 0.5rem;
      border: 0.1rem solid white;
      outline: none;
      font-size: medium;
      background-color: transparent;
      color: white;
      &:focus {
        border: 0.1rem solid green;
        background-color: white;
        transition: 0.2s linear;
        color: black;
      }
    }
    button {
      border-radius: 0.5rem;
      padding: 1rem 2rem;
      border: none;
      outline: none;
      font-size: large;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background-color: lightgreen;
        transition: 0.4s ease-in-out;
      }
    }
    span {
      color: white;
      a {
        color: lightblue;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
  }
`;
