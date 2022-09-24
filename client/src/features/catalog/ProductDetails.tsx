import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync, removeCartItemAsync } from "../cart/cartSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);

  const item = cart?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updateQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addCartItemAsync({
          productId: item?.productId!,
          quantity: updateQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeCartItemAsync({
          productId: item?.productId!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus === "pendingFetchProduct") return <LoadingComponent />;

  if (!product) return <h3>Product not found</h3>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={5}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="secondary" variant="h4">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
