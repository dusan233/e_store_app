import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgColor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "secondary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgColor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() => dispatch(addCartItemAsync({ productId: product.id }))}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Link to={`/catalog/${product.id}`}>
          <Button size="small">View</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
