import { getAllOrders } from "../api/order";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Collapse,
} from "@mui/material";
import { useState, useEffect } from "react";
import OrderItem from "../components/OrderItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";

function AllOrder({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    const adminStatus = localStorage.getItem("admin") === "true";
    setIsAdmin(adminStatus);

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        console.log("API Response:", data);
        setOrders(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error fetching orders", e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    if (adminStatus) {
      navigate("/allorder");
    } else {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

  const handleToggle = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  if (loading)
    return (
      <>
        <Fade in={loading} timeout={500}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              gap: "1rem",
            }}
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: "#2d3e50" }}
            />
            <Typography variant="h2" sx={{ color: "white" }}>
              Loading Product...
            </Typography>
          </div>
        </Fade>
        <Fade in={loading} timeout={5000}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              gap: "1rem",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7oBex_gwatjeJ1D1ZX3mVXEQujKe8qPYwzg&s"
              alt="Bombardino crocodilo"
            />
            <Typography variant="h4" sx={{ color: "white" }}>
              here Bombardilo wait with you.
            </Typography>
          </div>
        </Fade>
      </>
    );
  return isAdmin ? (
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
        <Typography variant="h4">Customer's Orders</Typography>
      </Box>
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
                  <TableCell sx={{ color: "white" }}>
                    #{order._id} ({order.user.username})
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
    </Box>
  ) : (
    <>
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" color="white">
          You are not an admin are you?
        </Typography>
        <img
          src="https://i.ytimg.com/vi/9UkkRJl3Ii0/maxresdefault.jpg"
          alt="the rock raise eyebrow"
        />
      </Box>
    </>
  );
}

export default AllOrder;
