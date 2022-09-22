import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync, removeCartItemAsync, setCart } from "./cartSlice";

const CartPage = () => {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!cart) return <Typography variant="h3">Your cart is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId
                    )}
                    onClick={() =>
                      dispatch(
                        removeCartItemAsync({ productId: item.productId })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status.includes("pendingAddItem" + item.productId)}
                    onClick={() =>
                      dispatch(addCartItemAsync({ productId: item.productId }))
                    }
                    color="error"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>

                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId
                    )}
                    onClick={() =>
                      dispatch(
                        removeCartItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/checkout">Checkout</Link>
    </>
  );
};

export default CartPage;
