import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, IconButton, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteProduct, updateProductStatus } from "../api/product";
import Swal from "sweetalert2";
import { useState } from "react";
import EditProduct from "./forms/EditProduct";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

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

function DashboardItem({ product, fetchData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { success, data } = await DeleteProduct(id);
        console.log("API Response:", success, data);

        if (success) {
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
          });
          fetchData();
        }
      }
    });
  };

  const handleStatus = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "It will affect the product status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { success, data } = await updateProductStatus(id);
        console.log("API Response:", success, data);

        if (success) {
          if (product.isActive === false) {
            Swal.fire({
              title: "Turned on!",
              text: "Product is now visible on the home page.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Turned off!",
              text: "Product has been turn off.",
              icon: "success",
            });
          }
          fetchData();
        }
      }
    });
  };

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 }, color: "white" }}
    >
      <TableCell component="th" scope="row">
        <img
          src={`http://20.255.152.58/api/${product.image}`}
          alt={`${product.name}`}
        />
      </TableCell>
      <TableCell align="right" sx={{ color: "white", textAlign: "left" }}>
        {product.name}
      </TableCell>
      <TableCell align="right" sx={{ color: "white" }}>
        RM{product.price}
      </TableCell>
      <TableCell align="right" sx={{ color: "white" }}>
        {product.quantity}
      </TableCell>
      <TableCell align="right">
        {" "}
        <span
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: product.isActive ? "green" : "red",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
      </TableCell>
      <TableCell align="right" sx={{ paddingRight: 6 }}>
        <Box>
          <IconButton onClick={handleOpen} sx={{ color: "yellow" }}>
            <EditIcon />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <EditProduct
                product={product}
                setOpen={setOpen}
                fetchData={fetchData}
              />
            </Box>
          </Modal>
          <IconButton
            onClick={() => deleteHandler(product._id)}
            sx={{ color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            sx={{ color: "green" }}
            onClick={() => handleStatus(product._id)}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default DashboardItem;
