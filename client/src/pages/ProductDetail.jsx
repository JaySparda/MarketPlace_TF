import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  CircularProgress,
  Fade,
} from "@mui/material";
import { fetchProductById } from "../api/product";
import AddToCart from "../components/forms/AddToCart";
import Reviews from "../components/Review";

function ProductDetail({ fetchData, userId }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("admin") === "true";
    setIsAdmin(adminStatus);
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (e) {
        console.error("Error fetching product:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, fetchData]);

  if (loading)
    return (
      <Fade in={loading} timeout={500}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "1rem",
          }}
        >
          <CircularProgress size={60} thickness={4} sx={{ color: "#2d3e50" }} />
          <Typography variant="h2" sx={{ color: "white" }}>
            Loading Details...
          </Typography>
        </div>
      </Fade>
    );
  if (!product)
    return <Typography sx={{ color: "white" }}>Product not found</Typography>;

  return product.isActive ? (
    <>
      <Box
        sx={{ maxWidth: 1200, mx: "auto", p: 3, backgroundColor: "#282828" }}
      >
        {/* Product Title */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#2a2a2a",
            p: 3,
            mb: 3,
            borderLeft: "4px solid #2478ae", // Using your existing blue color
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "white",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {product.name}
          </Typography>
        </Paper>
        <Divider sx={{ my: 3, backgroundColor: "#2478ae" }} />

        {/* Price and Add to Cart Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={`http://20.255.152.58/api/${product.image}`}
                alt={`${product.name}`}
                style={{ width: "100%", height: "200px" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Pricing Info */}
            <Typography variant="h6" color="white" gutterBottom>
              Lowest Price:
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 1, color: "white" }}
            >
              RM{product.price.toFixed(2)} each
            </Typography>
            <Typography variant="body2" color="white" sx={{ mb: 3 }}>
              {product.quantity} Available
            </Typography>

            {isAdmin || !userId ? null : (
              <>
                {/* Quantity Selector */}
                <Typography variant="subtitle1" gutterBottom color="white">
                  Amount:
                </Typography>
                <AddToCart productId={product._id} />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Product Description */}
            <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: "#282828" }}>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-line", color: "white" }}
              >
                {product.description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, backgroundColor: "#2478ae" }} />
        <Reviews product={product} />
      </Box>
    </>
  ) : (
    <>
      <Box
        sx={{ maxWidth: 1200, mx: "auto", p: 3, backgroundColor: "#282828" }}
      >
        {/* Product Title */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#2a2a2a",
            p: 3,
            mb: 3,
            borderLeft: "4px solid #2478ae", // Using your existing blue color
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "white",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {product.name}
          </Typography>
        </Paper>
        <Divider sx={{ my: 3, backgroundColor: "#2478ae" }} />

        {/* Price and Add to Cart Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={`http://20.255.152.58/api/${product.image}`}
                alt={`${product.name}`}
                style={{ width: "100%", height: "200px" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Pricing Info */}
            <Typography variant="h6" gutterBottom color="red">
              UNAVAILABLE
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Product Description */}
            <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: "#282828" }}>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-line", color: "white" }}
              >
                {product.description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, backgroundColor: "#2478ae" }} />
        <Reviews product={product} userId={userId} />
      </Box>
    </>
  );
}

export default ProductDetail;
