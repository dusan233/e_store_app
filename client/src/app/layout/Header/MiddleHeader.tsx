import { ShoppingCart, Favorite } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/configureStore";
import SignedInMenu from "../SignedInMenu";
import logoImage from "../../images/logo.png";
import CatalogNavigation from "./CatalogNavigation";
import NavigationLink from "./NavigationLink";
import TopHeader from "./TopHeader";

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const MiddleHeader = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar sx={{ mb: 4 }} position="static">
      <TopHeader />
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          <NavLink style={{ color: "white", textDecoration: "none" }} to="/">
            <Box display="flex" alignItems="center">
              <img src={logoImage} />
            </Box>
          </NavLink>

          <Box display="flex" alignItems="center">
            <Stack direction="row" marginRight={3} spacing={0.1}>
              <IconButton
                onClick={() => {
                  user ? navigate("/cart") : navigate("/login");
                }}
                size="large"
                sx={{ color: "inherit" }}
              >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Stack>

            {user ? (
              <SignedInMenu />
            ) : (
              <Stack direction="row" spacing={1.5}>
                {rightLinks.map(({ title, path }) => (
                  <NavigationLink path={path} key={title}>
                    {title}
                  </NavigationLink>
                ))}
              </Stack>
            )}
          </Box>
        </Toolbar>
      </Container>
      <CatalogNavigation />
    </AppBar>
  );
};

export default MiddleHeader;
