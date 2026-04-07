import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.msg || "Something went wrong...",
    };
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return data;
  } catch (error) {
    return {
      message: error.response?.data?.msg || "Something went wrong...",
    };
  }
};

export const addProduct = async (product, image) => {
  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", parseInt(product.price));
    formData.append("description", product.description);
    formData.append("quantity", parseInt(product.quantity));
    formData.append("image", image);

    const token = localStorage.getItem("token");

    const { data } = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message.msg || "Error Occured when adding product",
    };
  }
};

export const DeleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");
    let { data } = await axios.delete(`${API_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.msg || "Something went wrong",
    };
  }
};

export const editProduct = async (product, image) => {
  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", parseInt(product.price));
    formData.append("description", product.description);
    formData.append("quantity", parseInt(product.quantity));
    formData.append("image", image);
    const token = localStorage.getItem("token");
    let { data } = await axios.put(
      `${API_URL}/products/${product._id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.msg || "Something went wrong",
    };
  }
};

export const updateProductStatus = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.patch(
      `${API_URL}/products/${id}`,
      {}, // Empty object if no request body needed
      {
        // Config object as third parameter
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.msg || "Something went wrong...",
    };
  }
};
