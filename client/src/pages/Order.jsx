import { getMyOrders } from "../api/order";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Link,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Fade,
  Collapse,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import OrderItem from "../components/OrderItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";

function Order({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (e) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleToggle = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

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
            Loading Orders...
          </Typography>
        </div>
      </Fade>
    );
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">My Orders</Typography>
      </Box>
      {!orders ? (
        <>
          <h2>Such empty order</h2>
          <Link href="/">Go back to Shopping</Link>
        </>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#282828",
            border: "1px solid black",
            borderBottom: "none",
          }}
        >
          {orders.map((order) => {
            const orderTotal = order.items.reduce(
              (sum, item) => sum + item.subtotal,
              0
            );

            const orderItems = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );

            return (
              <Table key={order._id}>
                <TableHead
                  sx={{
                    backgroundColor: "#2478ae",
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "#20a6b1",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      #{order._id}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleToggle(order._id)}
                        aria-expanded={expandedOrder === order._id}
                        sx={{ backgroundColor: "grey" }}
                      >
                        {expandedOrder === order._id ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <Collapse
                  in={expandedOrder === order._id}
                  timeout={300}
                  easing={{
                    enter: "cubic-bezier(0.4, 0, 0.2, 1)",
                    exit: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <TableBody sx={{ width: "100%" }}>
                    <TableRow>
                      <TableCell sx={{ color: "grey" }}>
                        Date:
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "white",
                          }}
                        >
                          {new Date(order.purchased_date).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "grey" }}>
                        Total:{" "}
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "white",
                          }}
                        >
                          RM{orderTotal.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        Items: {orderItems}
                      </TableCell>
                    </TableRow>
                    <OrderItem order={order} />
                  </TableBody>
                </Collapse>
              </Table>
            );
          })}
        </TableContainer>
      )}
    </Box>
  );
}

export default Order;
