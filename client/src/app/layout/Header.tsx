import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const Header = ({ darkMode, handleThemeChange }: Props) => {
  return (
    <AppBar color="primary" sx={{ mb: 4 }} position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <NavLink style={{ color: "white", textDecoration: "none" }} to="/">
            <Typography variant="h6">GIGATRON</Typography>
          </NavLink>

          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
        <Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem>
                <NavLink to={path}>{title.toUpperCase()}</NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem>
                <NavLink to={path}>{title.toUpperCase()}</NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
