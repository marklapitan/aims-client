import Axios from "./axios";

async function register(credentials) {
  const response = await Axios.post('/auth/register', credentials);
  return response.data;
}

async function login(credentials) {
  const response = await Axios.post('/auth/login', credentials);
  return response.data;
}

export default {
  register,
  login,
};
