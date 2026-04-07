import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");
  let { data } = await axios.get(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  let { data } = await axios.get(`${API_URL}/orders/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
