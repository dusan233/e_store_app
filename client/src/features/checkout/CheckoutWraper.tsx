import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe(
  "pk_test_51LptYtJ6W2yVtsGE3sfQoXLvL3LeGkUzejq0UgVxYj04FCb6V0ql7bqp8GnHd2Wa43yvFDHbhL4RTGNtRlfjsdv100rkchCnYq"
);

const CheckoutWraper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutWraper;
