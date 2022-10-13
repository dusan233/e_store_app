import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Typography } from "@mui/material";
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

  const item = cart?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, item, dispatch, product]);

  function handleUpdateCart() {
    dispatch(
      addCartItemAsync({
        productId: product?.id!,
      })
    );
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
        <Typography variant="h4">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="secondary" variant="h4">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Box mt={4}>
          <Typography variant="subtitle1" gutterBottom>
            <Box
              component="span"
              sx={{ color: "primary.dark", fontWeight: "bold" }}
            >
              Description:
            </Box>{" "}
            {product.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <Box
              component="span"
              sx={{ color: "primary.dark", fontWeight: "bold" }}
            >
              Type:
            </Box>{" "}
            {product.type}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <Box
              component="span"
              sx={{ color: "primary.dark", fontWeight: "bold" }}
            >
              Platform:
            </Box>{" "}
            {product.type2}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <Box
              component="span"
              sx={{ color: "primary.dark", fontWeight: "bold" }}
            >
              Brand:
            </Box>{" "}
            {product.brand || "/"}
          </Typography>
        </Box>

        <Box mt={5}>
          <LoadingButton
            disabled={status.includes("pending")}
            loading={status.includes("pending")}
            onClick={handleUpdateCart}
            color="primary"
            size="large"
            variant="contained"
            fullWidth
          >
            Add to cart
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
