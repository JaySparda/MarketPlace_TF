import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProductReview = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/reviews/${id}`);
    return data;
  } catch (error) {
    return {
      message: error.response.data.msg || "Something went wrong...",
    };
  }
};

export const addReview = async (userId, productId, review) => {
  try {
    // const formData = new FormData();
    // formData.append("rating", parseInt(review.rating));
    // formData.append("productId", parseInt(productId));
    // formData.append("message", parseInt(review.message));
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${API_URL}/reviews`,
      { ...review, productId, userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg || "Something went wrong...",
    };
  }
};

export const deleteReview = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.delete(`${API_URL}/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data };
  } catch (e) {
    return {
      success: false,
      msg: e.response?.data?.msg || "Something went wrong...",
    };
  }
};
