import { Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import api from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setCart } from "../cart/cartSlice";
import Checkout from "./Checkout";

const stripePromise = loadStripe(
  "pk_test_51LptYtJ6W2yVtsGE3sfQoXLvL3LeGkUzejq0UgVxYj04FCb6V0ql7bqp8GnHd2Wa43yvFDHbhL4RTGNtRlfjsdv100rkchCnYq"
);

const CheckoutWraper = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.payments
      .createPaymentIntent()
      .then((cart) => setCart(cart))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return <Typography>Loading checkout...</Typography>;

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutWraper;
