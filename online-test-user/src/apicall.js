import axios from "axios";
import swal from "sweetalert";
// const baseURL = 'http://code-api.codingmart.xyz/node'
const baseURL = "http://localhost:9000/node";

export const plainApi = axios.create({ baseURL });
export const authApi = axios.create({ baseURL });

authApi.interceptors.request.use((config) => {
  config.headers["token"] = JSON.parse(sessionStorage.getItem("token")).token;
  config.headers["userid"] = JSON.parse(sessionStorage.getItem("token")).tokenId;
  return config;
});

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 403) {
        swal({icon:"error",text:"Token Expired"})
        window.sessionStorage.clear();
        window.history.go("/");
        return Promise.reject(error);
      }
      else if(error.response.status === 401) {
        swal({icon:"error",text:"User Logged Out"})
        window.sessionStorage.clear();
        window.history.go("/");
        return Promise.reject(error);
      }
    } else {
      swal({icon:"error", text:"Network Error"})
      window.sessionStorage.clear();
      window.history.go("/");
      return Promise.reject(error);
    }
  }
);
