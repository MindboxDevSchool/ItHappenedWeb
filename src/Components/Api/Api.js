import axios from "axios";

const apiBaseUrl = "http://localhost:5000";

const instance = axios.create({
  baseURL: apiBaseUrl,
});

const authorizedRequestConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export const updateRequestToken = () => {
  authorizedRequestConfig.headers.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
};

export const createTracker = (trackerBody) =>
  instance.post(`/trackers`, trackerBody, authorizedRequestConfig);

export const registerUser = (login, password) =>
  instance.post(`/users`, { userName: login, password: password });

export const loginUser = (login, password) =>
  instance.post(`/login`, { userName: login, password: password });

export const getTrackers = () =>
  instance.get(`/trackers`, authorizedRequestConfig);

export const deleteTracker = (id) =>
  instance.delete(`trackers/${id}`, authorizedRequestConfig);

export const getTracker = (trackerId) =>
  instance.get(`/trackers/${trackerId}`, authorizedRequestConfig);

export const editTracker = (trackerId, editedTrackerBody) => {
  return instance.put(
    `/trackers/${trackerId}`,
    editedTrackerBody,
    authorizedRequestConfig
  );
};

export const getEvents = (trackerId) =>
  instance.get(`/trackers/${trackerId}/events`, authorizedRequestConfig);

export const getEvent = (eventId) =>
  instance.get(`/events/${eventId}/`, authorizedRequestConfig);

export const addEvent = (trackerId, eventBody) =>
  instance.post(
    `/trackers/${trackerId}/events`,
    eventBody,
    authorizedRequestConfig
  );

export const getFilteratedEvents = (
  trackerId,
  filterParams,
) => {
  let request_config = {};
  request_config.params = filterParams;
  request_config.headers = authorizedRequestConfig.headers;

  return instance.get(`/trackers/${trackerId}/events/filters`, request_config);
};

export const deleteEvent = (eventId) =>
  instance.delete(`events/${eventId}`, authorizedRequestConfig);
