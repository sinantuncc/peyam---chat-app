import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../img/logo.png';
import { allUsersRoute } from '../utils/APIRoutes';
import { getData } from '../utils/fetchData';

export default function Contacts({ currentUser, changeChat }) {
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const userId = currentUser?._id;
  const { avatar, username } = currentUser;

  useEffect(() => {
    getUsers();
  }, [userId]);

  const getUsers = async () => {
    const result = await getData(`${allUsersRoute}/${userId}`);
    setContacts(result.data);
  };

  const changeCurrentChat = (index, contact) => {
    setSelectedUser(index);
    changeChat(contact);
  };

  return (
    <>
      {contacts.length ? (
        <Container>
          <div className='brand'>
            <img src={Logo} alt='Logo' />
            <h3>peyam</h3>
          </div>
          <div className='contacts'>
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === selectedUser ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className='avatar'>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatar}`}
                      alt={`avatar-${index}`}
                    />
                  </div>
                  <div className='username'>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt='current-avatar'
              />
            </div>
            <div className='username'>
              <h2>{username}</h2>
            </div>
          </div>
        </Container>
      ) : (
        'not found'
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #08042035;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    text-transform: capitalize;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      align-items: center;
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      cursor: pointer;
      transition: 0.4rem ease-in-out;
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
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    display: flex;
    background-color: #0d0d3098;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        min-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
