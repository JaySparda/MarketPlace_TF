import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { editProduct } from "../../api/product";
import Swal from "sweetalert2";

function EditProduct({ product, setOpen, fetchData }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [updatedImage, setUpdatedImage] = useState(product.image);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updatedProduct.quantity < 0) {
      Swal.fire({
        title: "Quantity error",
        icon: "error",
        text: "quantity must be more than -1",
      });
    }

    const res = await editProduct(updatedProduct, updatedImage);
    if (res.success) {
      Swal.fire({
        title: "Product updated",
        icon: "success",
        text: res.data.msg,
      });
    } else {
      Swal.fire({
        title: "Opps...",
        icon: "error",
        text: res.message,
      });
    }
    fetchData();
    setOpen(false);
  };

  const handleImage = (e) => setUpdatedImage(e.target.files[0]);
  return (
    <Box
      sx={{
        maxHeight: "90vh", // Limits height to 90% of viewport
        overflowY: "auto", // Enables vertical scrolling
        "&::-webkit-scrollbar": {
          // Optional: Custom scrollbar styling
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#97bbd1",
          borderRadius: "3px",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: { xs: 300, sm: 350, md: 400 },
          minHeight: "min-content", // Prevents paper shrinking
        }}
      >
        <Typography variant="h4" textAlign="center">
          Update Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
            inputProps={{ min: 1 }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            onChange={handleChange}
            value={updatedProduct.description}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            type="number"
            name="quantity"
            value={updatedProduct.quantity}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            required
          />
          <img
            src={`http://20.255.152.58/api/${updatedProduct.image}`}
            alt={`${updatedProduct.name}`}
          />
          <TextField
            type="file"
            margin="normal"
            name="image"
            onChange={handleImage}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#2d3e50" }}
          >
            Update Product
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#97bbd1", my: 1 }}
          >
            Close
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default EditProduct;
