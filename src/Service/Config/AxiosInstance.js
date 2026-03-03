import axios from "axios";
import { Api_Base_URL } from "../../Constants/Constants";
export const axiosInstance = axios.create({
  baseURL: Api_Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
