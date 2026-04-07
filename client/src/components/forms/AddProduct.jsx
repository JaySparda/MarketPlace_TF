import { useState } from "react";
import Swal from "sweetalert2";
import { addProduct } from "../../api/product";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

function AddProduct({ fetchData, setOpen }) {
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await addProduct(product, image);
    if (res.success) {
      Swal.fire({
        title: "Product added",
        icon: "success",
        text: res.data.msg,
      });
    } else {
      Swal.fire({ title: "Opps", icon: "error", text: res.message });
    }
    fetchData();
    setOpen(false);
  };

  const handleImage = (e) => setImage(e.target.files[0]);

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" textAlign="center">
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            type="number"
            name="price"
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
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            type="number"
            name="quantity"
            onChange={handleChange}
            inputProps={{ min: 1 }}
            required
          />
          <TextField
            type="file"
            margin="normal"
            name="image"
            onChange={handleImage}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#2d3e50" }}
          >
            Add Product
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

export default AddProduct;
