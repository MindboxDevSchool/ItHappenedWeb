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

export const getFilteration = (trackerId, filterParams, authorizedRequestConfig) =>
  instance.get(
    `/trackers/${trackerId}/events/filters`,
    null,
    filterParams,
    authorizedRequestConfig,
  );


export const deleteEvent = (eventId, authorizedRequestConfig) => 
instance.delete(`events/${eventId}`, authorizedRequestConfig);
