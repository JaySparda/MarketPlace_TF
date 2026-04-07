import * as React from "react";
import { Box, TextField, TableCell, TableRow, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { updateQuantity } from "../api/cart";
import { RemoveItem } from "../api/cart";
import Swal from "sweetalert2";

function CartItem({ item, fetchMyCart }) {
  const [newQuantity, setNewQuantity] = useState(item.quantity);

  const quantityHandler = async (e) => {
    e.preventDefault();

    let updatedQty = e.target.value;
    setNewQuantity(updatedQty);
    await updateQuantity(item.product._id, updatedQty);
    fetchMyCart();
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    let res = await RemoveItem(item.product._id);
    if (res.success) {
      Swal.fire({ title: "Item Removed", icon: "success", text: res.data.msg });
    } else {
      Swal.fire({
        title: "An Error Occured",
        icon: "error",
        text: res.message,
      });
    }
    fetchMyCart();
  };
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 }, color: "white" }}
    >
      <TableCell component="th" scope="row">
        <img
          src={`http://20.255.152.58/api/${item.product.image}`}
          alt={`${item.product.name}`}
        />
      </TableCell>
      <TableCell align="right" sx={{ color: "white" }}>
        {item.product.name}
      </TableCell>
      <TableCell align="right" sx={{ color: "white" }}>
        {item.product.price}
      </TableCell>
      <TableCell align="right">
        {" "}
        <input
          type="number"
          name="quantity"
          value={newQuantity}
          onChange={quantityHandler}
          className="flex-1 px-4 py-2 border rounded"
          min={1}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton sx={{ color: "red" }} onClick={handleRemove}>
          <CloseIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default CartItem;
