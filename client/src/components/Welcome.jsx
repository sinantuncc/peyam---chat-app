import React from 'react';
import styled from 'styled-components';
import Robot from '../img/robot.gif';

export default function Welcome({ currentUser }) {
  const { username } = currentUser;
  return (
    <>
      <Container>
        <img src={Robot} alt='robot' />
        <h1>
          Welcome, <span>{username}!</span>
        </h1>
        <h3>Select a chat to start messaging.</h3>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  img {
    height: 20rem;
  }
  h1 {
    span {
      color: blueviolet;
    }
  }
`;
