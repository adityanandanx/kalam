import axios, { AxiosError, isAxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log("Error response:", error.response);
      if (isAxiosError(error)) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);
