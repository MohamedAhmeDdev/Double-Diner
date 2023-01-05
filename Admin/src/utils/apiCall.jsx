import axios from "axios";

const BASE_URL = "http://localhost:5000/admin";

/**
 * Because we need to send the token with every request, we will create a function that will be called every time we need to make a request
 * @param {string} url
 * @param {string} method
 * @param {object} data
 * @returns {object} response
 */
export const apiCall = async (url, method, data = {}, headers = {}) => {
  // get the user token from the local storage
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  const config = {
    headers: { Authorization: `${token}`, ...headers },
  };

  try {
    const res = await axios({
      method,
      url,
      data,
      baseURL: BASE_URL,
      ...config,
    });
    return res.data;
  } catch (err) {
    return Promise.reject(err.response.data);
  }
};
