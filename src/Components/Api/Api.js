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

export const registerUser = (login, password) =>
  instance.post(`/users`, { userName: login, password: password });

export const loginUser = (login, password) =>
  instance.post(`/login`, { userName: login, password: password });

export const getTrackers = (authorizedRequestConfig) =>
  instance.get(`/trackers`, authorizedRequestConfig);

export const deleteTracker = (id, authorizedRequestConfig) =>
  instance.delete(`trackers/${id}`, authorizedRequestConfig);

export const getTracker = (trackerId, authorizedRequestConfig) =>
  instance.get(`/trackers/${trackerId}`, authorizedRequestConfig);

export const getEvents = (trackerId, authorizedRequestConfig) =>
  instance.get(`/trackers/${trackerId}/events`, authorizedRequestConfig);

export const getEvent = (eventId, authorizedRequestConfig) =>
  instance.get(`/events/${eventId}/`, authorizedRequestConfig);

export const addEvent = (trackerId, eventBody, authorizedRequestConfig) =>
  instance.post(
    `/trackers/${trackerId}/events`,
    eventBody,
    authorizedRequestConfig
  );

export const getFilteratedEvents = (trackerId, filterParams, authorizedRequestConfig) => {
  console.log('API getFilteratedEvents');
  console.log(filterParams);

  let request_config = {};
  request_config.params = filterParams;
  request_config.headers = authorizedRequestConfig.headers;

  console.log('request_config');
  console.log(request_config);

  return instance.get(
    `/trackers/${trackerId}/events/filters`,
     request_config
  );
}


// // `headers` are custom headers to be sent
// headers: {'X-Requested-With': 'XMLHttpRequest'},

// // `params` are the URL parameters to be sent with the request
// // Must be a plain object or a URLSearchParams object
// params: {
//   ID: 12345
// },

// const authorizedRequestConfig = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// };

// var dict = []; // create an empty array

// dict.push({
//     key:   "keyName",
//     value: "the value"
// });


export const deleteEvent = (eventId, authorizedRequestConfig) =>
  instance.delete(`events/${eventId}`, authorizedRequestConfig);
