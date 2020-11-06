import axios from "axios";

const apiBaseUrl = "http://localhost:5000";

export const getUserCredentials = () => ({
  name: localStorage.getItem("login"),
  token: localStorage.getItem("token"),
});

const instance = axios.create({
  baseURL: apiBaseUrl,
});

export const createTracker = (trackerBody, authorizedRequestConfig) =>
  instance.post(`/trackers`, trackerBody, authorizedRequestConfig);
// .then(result => result.data)
// .catch(error => console.log(error.response));

export const registerUser = (login, password) =>
  instance.post(`/users`, { userName: login, password: password });

export const loginUser = (login, password) =>
  instance.post(`/login`, { userName: login, password: password });

export const getTrackers = (authorizedRequestConfig) =>
  instance.get(`/trackers`, authorizedRequestConfig);
  
export const deleteTracker = (id, authorizedRequestConfig) =>
  instance.delete(`trackers/${id}`, authorizedRequestConfig);
