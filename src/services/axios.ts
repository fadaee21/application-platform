import axios from "axios";
// import Cookies from "js-cookie";

// axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.baseURL = "http://localhost:8000";

export const userLogin = axios.create({
  method: "POST",
  timeout: 5000,
  // withCredentials: false,
});

export const getData = axios.create({
  method: "GET",
});

export const postData = axios.create({
  method: "POST",
});

export const removeData = axios.create({
  method: "DELETE",
});
export const editAxios = axios.create({
  method: "PUT",
});

// getData.interceptors.request.use(
//   (request) => {
//     request.headers.common["Authorization"] = Cookies.get("token");
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const fetcherGet = (url: string) => getData(url).then((res) => res.data);
