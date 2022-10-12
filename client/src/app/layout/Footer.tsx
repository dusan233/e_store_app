import { Box, Container, Typography } from "@mui/material";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <Box sx={{ background: "black", mt: 2, p: 2, color: "white" }}>
      <Container>
        <Box display="flex" justifyContent="Center" alignItems="center">
          <img src={logo} />
          <Typography ml={3}>
            © {new Date().getFullYear()} games | Games and Consoles
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
