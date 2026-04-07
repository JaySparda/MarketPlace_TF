import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const pushToCart = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      `${API_URL}/carts`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return {
      success: true,
      data,
    };
  } catch (e) {
    return {
      success: false,
      msg: e.response?.data?.msg || "Error occured when adding product",
    };
  }
};

export const fetchCart = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${API_URL}/carts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const updateQuantity = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `${API_URL}/carts`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data };
  } catch (e) {
    return {
      success: false,
      msg: e.response.data.msg || "Opps something went wrong",
    };
  }
};

export const emptyCart = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(`${API_URL}/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const RemoveItem = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`${API_URL}/carts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      success: true,
      data,
    };
  } catch (e) {
    return {
      success: false,
      msg: e.response.data.msg || "Opps something went wrong",
    };
  }
};

export const cartCheckout = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(`${API_URL}/orders`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
