import axios from "axios";

const apiBaseUrl = "http://localhost:5000";

export const getUserCredentials = () => ({
  name: localStorage.getItem("login"),
  token: localStorage.getItem("token")
});

const authorizedRequestConfig = {
  headers: {
    Authorization: `Bearer ${getUserCredentials().token}`
  }
};

const instance = axios.create({
  baseURL: apiBaseUrl
});

export const createTracker = (trackerBody) =>
  instance
  .post(`/trackers`, trackerBody, authorizedRequestConfig);

export const registerUser = (login, password, saveToken) =>
  instance
  .post(`/users`, {
    "userName": login,
    "password": password
  })
  .then(result => saveToken(result.data.token))
  .catch(error => console.log(error.response));

export const getTrackers = () =>
  instance
  .get(`/trackers`, authorizedRequestConfig)

export const deleteTracker = (id) =>
  instance
  .delete(`trackers/${id}`, authorizedRequestConfig);

export const getTracker = (trackerId) =>
  instance.get(`/trackers/${trackerId}`, authorizedRequestConfig);

  export const getEvents = (trackerId) => 
  instance.get(`/trackers/${trackerId}/events`, authorizedRequestConfig);

  export const addEvent = (trackerId, eventBody) => 
  instance.post(`/trackers/${trackerId}/events`, eventBody, authorizedRequestConfig);