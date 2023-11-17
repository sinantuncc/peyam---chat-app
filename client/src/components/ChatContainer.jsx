import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { postData } from '../utils/fetchData';
import { getAllMessages, sendMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { username, avatar } = currentChat;
  const scrollRef = useRef();

  useEffect(() => {
    updateChat();
  }, [currentChat]);

  const updateChat = async () => {
    const msgData = {
      from: currentUser?._id,
      to: currentChat?._id,
    };
    const getMsgs = await postData(getAllMessages, msgData);

    setMessages(getMsgs.data);
  };

  const handleSendMsg = async (msg) => {
    const msgData = {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    };
    await postData(`${sendMessageRoute}`, msgData);

    socket.current.emit('send-msg', msgData);

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' />
          </div>
          <div className='username'>
            <h3>{username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className='chat-messages'>
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className='contant'>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 13% 75% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: #080420;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    overflow: auto;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #d1d1d1;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .contant {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
      }
    }
    .sended {
      justify-content: end;
      .contant {
        background-color: #4f04ff31;
      }
    }
    .recieved {
      justify-content: start;
      .contant {
        background-color: #bb85df1f;
      }
    }
  }
`;
