import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.removeItem('current-user');
    navigate('/login');
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #e66210;
  outline: none;
  border: none;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
