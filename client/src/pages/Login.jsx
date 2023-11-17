import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../img/logo.png';
import { loginRoute } from '../utils/APIRoutes';
import { postData } from '../utils/fetchData';

const initialValues = {
  username: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(initialValues);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 7500,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    const currentUser = localStorage.getItem('current-user');

    if (currentUser) navigate('/');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postData(loginRoute, userData);

    const { data } = result;

    if (data.status) {
      const currentUser = {
        username: data.user.username,
        avatar: data.user.avatar,
        _id: data.user._id,
      };

      localStorage.setItem('current-user', JSON.stringify(currentUser));

      navigate('/');
    } else {
      toast.error(data.message, toastOptions);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='brand'>
            <img src={Logo} alt='logo' />
            <h1>Chat App</h1>
          </div>
          <input
            type='text'
            name='username'
            placeholder='Username'
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

          <button type='submit'>Login</button>
          <span>
            Don't have an account ? <Link to='/register'>Register</Link>
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
