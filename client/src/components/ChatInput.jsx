import React, { useState } from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { FaSmile } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

export default function ChatInput({ handleSendMsg }) {
  //Picker : emoji picker
  const [showPicker, setShowPicker] = useState(false);

  const [message, setMessage] = useState('');

  const tooglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    let msg = message;

    msg += emoji.emoji;
    setMessage(msg);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage('');
      setShowPicker(false);
    }
  };
  return (
    <Container>
      <div className='emoji-container'>
        <div className='emoji'>
          <FaSmile onClick={tooglePicker} />
          {showPicker && (
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              height={370}
              theme='dark'
            />
          )}
        </div>
      </div>
      <form className='input-container' onSubmit={(e) => sendChat(e)}>
        <input
          type='text'
          name='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setShowPicker(false)}
          autoComplete='off'
          placeholder='Type here...'
        />
        <button type='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  gap: 1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
  }
  .emoji-container {
    display: flex;
    align-items: center;
    color: white;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: calc(-380px);
        background-color: #080420;
        box-shadow: 0 5px 10px #9186f3;
        border-color: #9186f3;
        ::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9186f3;
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;

      background-color: transparent;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      color: white;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #9186f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1.5rem;
        }
      }
    }
  }
`;
