import axios from "axios";

const apiBaseUrl = "http://localhost:5000";

export const getUserCredentials = () => ({
  name: localStorage.getItem("login"),
  token: localStorage.getItem("token"),
});

const authorizedRequestConfig = {
  headers: { Authorization: `Bearer ${getUserCredentials().token}` },
};

const instance = axios.create({
  baseURL: apiBaseUrl,
});

export const createTracker = (trackerBody) =>
  instance.post(`/trackers`, trackerBody, authorizedRequestConfig);
// .then(result => result.data)
// .catch(error => console.log(error.response));

export const registerUser = (login, password, saveToken, saveName) =>
  instance
    .post(`/users`, { userName: login, password: password })
    .then((result) => {
      saveToken(result.data.token);
      saveName(result.data.name);
    })
    .catch((error) => console.log(error.response));

export const loginUser = (login, password) =>
  instance.post(`/login`, { userName: login, password: password })

export const getTrackers = () =>
  instance.get(`/trackers`, authorizedRequestConfig);
