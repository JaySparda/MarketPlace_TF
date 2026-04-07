import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

function OrderItem({ order }) {
  return (
    <>
      {order.items.map((item) => (
        <TableRow key={item.product._id}>
          <TableCell>
            <img
              src={`http://20.255.152.58/api/${item.product.image}`}
              alt={`${item.product.name}`}
              style={{ height: "60px" }}
            />
          </TableCell>
          <TableCell sx={{ color: "white" }}>
            <Link
              to={`/product/${item.product._id}`}
              style={{ textDecoration: "none", color: "#7D6D00" }}
            >
              {item.product.name}
            </Link>
          </TableCell>
          <TableCell sx={{ color: "white" }}>
            RM{item.product.price * item.quantity.toFixed(2)}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default OrderItem;
