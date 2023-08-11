import axios from 'axios';

const baseURL = "https://book-my-show-lzvv.onrender.com"

const getApi = async (url) => {
  let { data } = await axios.get(baseURL + url);
  return data;
}

const postApi = async (url, obj) => {
  let { data } = await axios.post(baseURL + url, obj);
  return data;
}


const putApi = async (url, obj) => {
  let { data } = await axios.put(baseURL + url, obj);
  return data;
}




export { getApi, postApi, putApi };