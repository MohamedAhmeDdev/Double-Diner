import { SERVER_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * Because we need to send the token with every request, we will create a function that will be called every time we need to make a request
 * @param {string} url
 * @param {string} method
 * @param {object} data
 * @returns {object} response
 */

//takes four parameters: "url", "method", "data", and "headers"
export const apiCall = async (url, method, data = {}, headers = {}) => {
  // get the user token from the local storage
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;  //if there is no user in the local storage, the token is set to null
  const config = {
    headers: { Authorization: `${token}`, ...headers },
  };

  //sending along the specified data and headers. The base URL for the request is set to the SERVER_URL constant
  try {
    const res = await axios({
      method,
      url,
      data,
      baseURL: SERVER_URL,
      ...config,
    });
    return res.data;
  } catch (err) {
    const errMessage = err.response?.data?.message || "Something went wrong";
    toast.error(errMessage); //this where the error displays
    throw err;
  }
};
