import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// REGISTER
export const createUser = async (formData) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/register`, formData);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg || "Something went wrong...",
    };
  }
};

// LOGIN
export const loginUser = async (formData) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/login`, formData);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg || "Something went wrong...",
    };
  }
};
