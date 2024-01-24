import axios from "axios";

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5001/api/v1"
      : "https://server-aims.onrender.com/api/v1",
});

export default Axios;
