import axios from "axios";
import { Api_Base_URL } from "../../Constants/Constants";

export const axiosInstance = axios.create({
  baseURL: Api_Base_URL,
  headers: {
    "Content-Type": "application/json",
    // TAMBAHKAN KEY RAHASIA DISINI
    "x-api-key": "PPID_KPU_SEKADAU_SECRET_GENTA", 
  },
});

// Opsional: Jika Anda ingin menambahkan token dinamis (misal JWT) di kemudian hari
axiosInstance.interceptors.request.use(
  (config) => {
    // Logika penambahan token admin jika sudah login bisa ditaruh di sini
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);