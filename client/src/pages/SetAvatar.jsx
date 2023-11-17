import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';
import loadingImg from '../img/loading.gif';
import { getData, postData } from '../utils/fetchData';

export default function SetAvatar() {
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const user = JSON.parse(localStorage.getItem('current-user'));
  const userId = user?._id;

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 7500,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    userId ? getAvatars() : navigate('/login');
  }, []);

  const setAvatar = async () => {
    if (selectedAvatar) {
      const result = await postData(`${setAvatarRoute}/${userId}`, {
        image: avatars[selectedAvatar],
      });

      const { isUpdate, image } = result.data;

      if (isUpdate) {
        user.avatar = image;

        localStorage.setItem('current-user', JSON.stringify(user));

        navigate('/');
      } else {
        toast.error('Avatar creation failed. Please try again.', toastOptions);
      }
    } else {
      toast.error('Please select an avatar', toastOptions);
    }
  };

  const getAvatars = async () => {
    const data = [];
    const api = 'https://api.multiavatar.com';
    const apiKey = 'zuTIbWlXYj5BVF';

    for (let i = 0; i < 4; i++) {
      let randomAvatar = Math.round(Math.random() * 1000);

      let url = `${api}/${randomAvatar}?apikey=${apiKey}`;

      console.log(url);
      const res = await getData(url);

      const buffer = Buffer.from(res.data, 'binary');

      const base64 = buffer.toString('base64');

      data.push(base64);
    }
    setAvatars(data);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loadingImg} alt='loading...' />
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>Pick an avatar your profile picture</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt={`avatar-${index}`}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className='submit-btn' onClick={setAvatar}>
            Set as Profile Picture
          </button>
        </Container>
      )}

      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
  background-color: #131324;

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.4s ease-in-out;

      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid green;
    }
  }
  .submit-btn {
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
`;
