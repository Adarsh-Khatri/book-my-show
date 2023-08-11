const key = "userId";

const storeUser = (id) => localStorage.setItem(key, id);

const getUser = () => localStorage.getItem(key) || null;

const removeUser = () => localStorage.removeItem(key);




const details = 'movieDetails';

const storeDetails = (data) => localStorage.setItem(details, JSON.stringify(data));

const getDetails = () => {
  let data = localStorage.getItem(details);
  return JSON.parse(data);
};




const slotTime = "slotTime";

const storeTime = (time) => localStorage.setItem(slotTime, time);

const getTime = () => localStorage.getItem(slotTime);







export { storeUser, getUser, removeUser, storeDetails, getDetails, storeTime, getTime }

