import axios from "axios";

const apiBaseUrl = "http://localhost:5000";

export const getUserCredentials = () => (
    {
        name: localStorage.getItem("login"), 
        token: localStorage.getItem("token")
});

const authorizedRequestConfig = { headers: { Authorization: `Bearer ${getUserCredentials().token}` }};

const instance = axios.create({
  baseURL: apiBaseUrl
});

export const createTracker = (trackerBody) => 
    instance
    .post(`/trackers`, trackerBody, authorizedRequestConfig);
    // .then(result => result.data)
    // .catch(error => console.log(error.response));

 export const registerUser = (login, password, saveToken) => 
    instance
    .post(`/users`, {"userName":login,"password":password})
    .then(result => saveToken(result.data.token))
    .catch(error => console.log(error.response));   

    export const getTrackers = () =>
      instance
        .get(`/trackers`, authorizedRequestConfig);

        export const deleteTracker = (id) => 
        instance
        .delete(`trackers/${id}`, authorizedRequestConfig);


      //   {
      //     public string ScaleMeasurementUnit { get; set; }
      //     public bool IsPhotoRequired { get; set; }
      //     public bool IsScaleRequired { get; set; }
      //     public bool IsRatingRequired { get; set; }
      //     public bool IsGeotagRequired { get; set; }
      //     public bool IsCommentRequired { get; set; }
      //     public bool IsCustomizationRequired { get; set; }
      // }