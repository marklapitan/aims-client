import axios from "axios";

const baseUrl = "/users";

async function register(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

async function login(credentials) {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
}

export default {
  register,
  login,
};
