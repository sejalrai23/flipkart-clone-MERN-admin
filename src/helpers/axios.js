import axios from "axios";
import { api } from "../url";
import store from "../Store";
import { authConstants } from "../actions/constants";

const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Authorization': token

  }

});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = token;
  }
  return req;
});

axiosInstance.interceptors.request.use((res) => {
  return res;
}, (error) => {
  console.log(error);
  const { status } = error.response;
  if (status === 500) {
    localStorage.clear();
    store.dispatch({ type: authConstants.LOGOUT_SUCCESS });

  }

  return Promise.reject(error);
});




export default axiosInstance;