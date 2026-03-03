import { axiosInstance } from "../Config/AxiosInstance";

export const PostForm = async (data) => {
  try {
    const response = await axiosInstance.post("/form/submit", {
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CekStatus = async (ticketId) => {
  try {
    const response = await axiosInstance.get(
      `/form/cek/status?id=${ticketId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
