import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
        <h2>dasdsa</h2>
      </Container>
    </ThemeProvider>
  );
}

export default App;
