import { axiosInstance } from "../Config/AxiosInstance";

export const PostAnalytic = async (data) => {
  try {
    const response = await axiosInstance.post("/analytic", {
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
