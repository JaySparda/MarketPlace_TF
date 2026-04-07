import { pushToCart } from "../../api/cart";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Swal from "sweetalert2";
import { useState } from "react";

function AddToCart({ productId, token }) {
  const [quantity, setQuantity] = useState(1);

  const quantityHandler = (e) => setQuantity(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      Swal.fire({ title: "Opps", icon: "error", text: "must be atleast 1" });
      return;
    }

    let res = await pushToCart(productId, quantity);

    if (res.success) {
      Swal.fire({ icon: "success", text: res.data.msg, title: "Good Job" });
    } else {
      Swal.fire({ icon: "error", text: res.msg, title: "Opps..." });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="quantity"
          defaultValue="1"
          onChange={quantityHandler}
          style={{
            width: "40px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: "14px",
            appearance: "textfield",
          }}
        />
        <IconButton
          type="submit"
          sx={{
            backgroundColor: "#2778a7",
            borderRadius: "5px",
            color: "white",
            padding: "8px",
            "&:hover": {
              backgroundColor: "#1a5a80",
            },
          }}
        >
          <ShoppingCartIcon fontSize="small" />
        </IconButton>
      </form>
    </>
  );
}

export default AddToCart;
