import axios from "axios";

const upload_url =
  "https://script.google.com/macros/s/AKfycbwzL_WdKSyYhWOm4BgZxQqgmBGcN1oI0QZLgysiRIhzCw1yIr6a4CjjGRkLmXV-xrAL/exec";

const SECRET_KEY = "PPID_SECRET_SEKADAU";

export const PostToDrive = async ({ fileName, fileData }) => {
  try {
    const response = await axios.post(
      upload_url,
      {
        fileName,
        fileData,
        secret: SECRET_KEY,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Upload gagal:", error);
    throw error;
  }
};
