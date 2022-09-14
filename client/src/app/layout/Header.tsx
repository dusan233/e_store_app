import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
  return (
    <AppBar color="primary" sx={{ mb: 4 }} position="static">
      <Toolbar>
        <Typography variant="h6">GIGATRON</Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
