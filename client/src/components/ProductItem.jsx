import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Grid,
  Badge,
} from "@mui/material";
import AddToCart from "./forms/AddToCart";
import { DeleteProduct } from "../api/product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductItem({ product, fetchData, userId }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("admin") === "true";
    setIsAdmin(adminStatus);
  }, [fetchData]);
  return product.isActive ? (
    <>
      <Grid item xs={12}>
        <Card variant="outlined">
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#2a2a2a",
              borderBottom: "1px solid #3d3d3f",
              padding: "12px",
              "&:hover": {
                backgroundColor: "#36474f",
              },
            }}
          >
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <Stack sx={{ backgroundColor: "#465a65", margin: 1 }}>
                <Typography variant="p" color="white">
                  {product.quantity}x
                </Typography>
                <img
                  src={`http://20.255.152.58/api/${product.image}`}
                  alt={`${product.name}`}
                  height="150px"
                  width="150px"
                />
              </Stack>
            </Link>
            <Stack
              direction="column"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#c6d4df",
                  fontSize: "14px",
                  marginBottom: "4px",
                  width: 80,
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#b0b0b0",
                  marginRight: "16px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                RM {product.price}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {isAdmin || !userId || product.quantity <= 0 ? null : (
                  <AddToCart productId={product._id} />
                )}
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </>
  ) : null;
}

export default ProductItem;
