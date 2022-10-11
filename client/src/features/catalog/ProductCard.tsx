import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync } from "../cart/cartSlice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Card variant="outlined">
      {/* <CardHeader
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "secondary.main" },
        }}
      /> */}

      <CardContent>
        <Link to={`/catalog/${product.id}`}>
          <Box
            sx={{ width: "100%", mb: 1 }}
            component="img"
            src={product.pictureUrl}
          ></Box>
        </Link>
        <Typography gutterBottom variant="body1">
          {product.name}
        </Typography>
        <Typography gutterBottom color="secondary" variant="h6">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() => dispatch(addCartItemAsync({ productId: product.id }))}
          size="small"
          variant="contained"
          endIcon={<ShoppingCart />}
          fullWidth
        >
          Add
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
