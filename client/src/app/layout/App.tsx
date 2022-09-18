import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CartPage from "../../features/cart/CartPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import api from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";

function App() {
  const { setCart } = useStoreContext();
  const [loading, seetLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      api.cart
        .get()
        .then((cart) => setCart(cart))
        .catch((err) => console.log(err))
        .finally(() => seetLoading(false));
    } else {
      seetLoading(false);
    }
  }, [setCart]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <LoadingComponent />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/catalog/:id" element={<ProductDetails />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/server-error" element={<ServerError />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
