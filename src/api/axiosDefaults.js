import axios from "axios";

axios.defaults.baseURL = "https://dacapo-api.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosRes = axios.create();
export const axiosReq = axios.create();