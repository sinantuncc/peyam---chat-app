import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Contacts from '../components/Contacts';
import { postData } from '../utils/fetchData';
import { isLoggedRoute, host } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();

  const [currentChat, setCurrentChat] = useState(undefined);

  const currentUser = JSON.parse(localStorage.getItem('current-user'));
  const userId = currentUser?._id;

  useEffect(() => {
    userId ? checkLogged() : navigate('/login');
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', userId);
    }
  }, [currentUser]);

  const checkLogged = async () => {
    const result = await postData(`${isLoggedRoute}/${userId}`);

    if (!result.data.isLogged) {
      localStorage.removeItem('current-user');
      navigate('/login');
    }
  };

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      {currentUser && (
        <Container>
          <div className='container'>
            <Contacts currentUser={currentUser} changeChat={handleChangeChat} />
            {currentChat ? (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            ) : (
              <Welcome currentUser={currentUser} />
            )}
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  gap: 1rem;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #423d3d76;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
