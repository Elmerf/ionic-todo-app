import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.100.167:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
