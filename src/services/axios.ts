import axios from "axios";

// const baseURL = "http://78.109.199.178:8082/v5";
const baseURL = "https://api.platform.nova724.com/v5";
const instance = axios.create({
  baseURL,
  headers: {
    // "Accept": "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
// Create a separate Axios instance for refreshing the token.
// This instance does not have the response interceptor that handles the 401 status code,
// thus avoiding the infinite loop scenario when the refresh token is invalid.
export const instanceRefresh = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
