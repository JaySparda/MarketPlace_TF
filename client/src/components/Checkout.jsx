import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { cartCheckout } from "../api/cart";
import Swal from "sweetalert2";
import { Select, MenuItem } from "@mui/material";

export default function Checkout({ cartTotal, fetchMyCart }) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: cartTotal },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      const name = details.payer.name.given_name;

      let res = await cartCheckout();
      if (res) {
        Swal.fire({
          icon: "success",
          title: `Transaction completed by ${name}`,
          text: res.msg,
        });
      }
      fetchMyCart();
    });
  };
  return (
    <div className="checkout">
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Select
            value={currency}
            onChange={onCurrencyChange}
            fullWidth
            size="small"
            sx={{
              mb: 2,
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(228, 219, 233, 0.25)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(228, 219, 233, 0.25)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(228, 219, 233, 0.25)",
              },
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
          >
            <MenuItem value="MYR" selected>
              MYR
            </MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="SGD">SGD</MenuItem>
          </Select>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={onCreateOrder}
            onApprove={onApproveOrder}
          />
        </>
      )}
    </div>
  );
}
