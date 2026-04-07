import { useEffect, useState } from "react";
import { fetchCart } from "../api/cart";
import {
  Link,
  Table,
  Box,
  Button,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CartItem from "../components/CartItem";
import { emptyCart } from "../api/cart";
import Swal from "sweetalert2";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "../components/Checkout";
import { useNavigate } from "react-router-dom";

function Cart({ userId }) {
  const [cartItems, setCartItems] = useState();
  const navigate = useNavigate();

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "MYR",
    intent: "capture",
  };

  const fetchMyCart = async () => {
    const data = await fetchCart();
    if (data) {
      setCartItems(data);
    } else {
      setCartItems([]);
    }
  };

  const handleEmptyCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, empty it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await emptyCart();
        Swal.fire({
          title: "EMPTIED!",
          text: "Your cart is empty now.",
          icon: "success",
        });
        fetchMyCart();
      }
    });
  };

  const cartTotal =
    cartItems?.items?.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0) || 0;

  const totalItems =
    cartItems?.items?.reduce((total, item) => {
      return total + item.quantity;
    }, 0) || 0;

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    fetchMyCart();
  }, []);
  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#1a1a1a",
        color: "#e0e0e0",
      }}
    >
      {!cartItems || !cartItems?.items ? (
        <>
          <Typography style={{ color: "white" }} variant="h4">
            Cart is Empty
          </Typography>
          <Link href="/">Go back to Shopping</Link>
        </>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#282828",
              border: "1px solid black",
              borderBottom: "none",
            }}
          >
            <Table>
              <TableHead
                sx={{
                  backgroundColor: "#2478ae",
                }}
              >
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                    Your Cart
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <Button
                    onClick={handleEmptyCart}
                    sx={{
                      backgroundColor: "#2d3e51",
                      color: "white",
                    }}
                  >
                    Clear Cart
                  </Button>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Image</TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    Name
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                {cartItems?.items?.map((cartItem) => (
                  <CartItem
                    item={cartItem}
                    key={cartItem.product._id}
                    fetchMyCart={fetchMyCart}
                  />
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Stack
                      spacing={{ xs: 1, sm: 2 }}
                      direction="row"
                      useFlexGap
                      sx={{ flexWrap: "wrap", color: "white" }}
                    >
                      <p>Total Items: {totalItems}</p>
                      <h4>
                        Total:
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", fontSize: "15px" }}
                        >
                          RM{cartTotal.toFixed(2)}
                        </Typography>
                      </h4>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <PayPalScriptProvider options={initialOptions}>
              <Checkout cartTotal={cartTotal} fetchMyCart={fetchMyCart} />
            </PayPalScriptProvider>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Cart;
