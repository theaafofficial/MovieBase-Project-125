import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5000/api/v1/movies",
});

export default instance;
