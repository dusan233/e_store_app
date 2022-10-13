import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header/MiddleHeader";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CartPage from "../../features/cart/CartPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchCartAsync } from "../../features/cart/cartSlice";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import themeOptions from "./themeOptions";

import Orders from "../../features/orders/Orders";
import CheckoutWraper from "../../features/checkout/CheckoutWraper";
import Footer from "./Footer";

function App() {
  const dispatch = useAppDispatch();
  const [loading, seetLoading] = useState(true);

  const theme = createTheme(themeOptions);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => seetLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" />
      <CssBaseline />
      <Header />
      <Container sx={{ my: 8 }}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/catalog/:id" element={<ProductDetails />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/server-error" element={<ServerError />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/checkout" element={<CheckoutWraper />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
