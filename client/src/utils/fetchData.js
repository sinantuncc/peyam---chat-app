import axios from 'axios';

export const postData = async (url, form = undefined) => {
  try {
    const res = await axios.post(url, form);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getData = async (url, config = undefined) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
