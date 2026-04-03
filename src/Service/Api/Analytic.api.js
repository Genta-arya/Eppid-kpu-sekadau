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


export const GetAnalytic = async () => {
  try {
    const response = await axiosInstance.get("/analytic/all");
    return response.data;
  } catch (error) {
    throw error;
  }
}