import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchCartAsync } from "../../features/cart/cartSlice";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import themeOptions from "./themeOptions";

import Orders from "../../features/orders/Orders";
import CheckoutWraper from "../../features/checkout/CheckoutWraper";
import Footer from "./Footer";
import api from "../api/agent";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();
  const [loading, seetLoading] = useState(true);
  const { user } = useAppSelector((state) => state.account);

  const theme = createTheme(themeOptions);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync());
    }
  }, [user]);

  useEffect(() => {
    initApp().then(() => seetLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" />
      <CssBaseline />
      <Box
        display="flex"
        sx={{
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Container sx={{ my: 8, flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/catalog" replace />}
            ></Route>
            <Route path="/catalog" element={<Catalog />}></Route>
            <Route path="/catalog/:id" element={<ProductDetails />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/server-error" element={<ServerError />}></Route>
            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user}>
                  <CartPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/orders"
              element={
                <ProtectedRoute user={user}>
                  <Orders />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/checkout"
              element={
                <ProtectedRoute user={user}>
                  <CheckoutWraper />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
