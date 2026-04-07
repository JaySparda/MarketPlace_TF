import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DashboardItem from "../components/DashboardItem";
import AddProduct from "../components/forms/AddProduct";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Dashboard({ products, fetchData, admin, userId }) {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    const adminStatus = localStorage.getItem("admin") === "true";
    setIsAdmin(adminStatus);

    if (adminStatus) {
      navigate("/dashboard");
    } else {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Typography variant="h4">DashBoard</Typography>
      <Button onClick={handleOpen}>Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddProduct fetchData={fetchData} setOpen={setOpen} admin={admin} />
        </Box>
      </Modal>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#282828",
          border: "1px solid black",
          borderBottom: "none",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#2478ae",
            }}
          >
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
              <TableCell align="right" sx={{ color: "white" }}>
                Status
              </TableCell>
              <TableCell align="right" sx={{ paddingRight: 6, color: "white" }}>
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <DashboardItem
                product={product}
                key={product._id}
                fetchData={fetchData}
              />
            ))}
          </TableBody>
        </Table>
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

export default Dashboard;
