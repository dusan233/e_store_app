import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h5" gutterBottom>
            Server error
          </Typography>
          <Divider />
          <Typography gutterBottom>
            {state.error.detail || "Internal server error"}
          </Typography>
          <Button onClick={() => navigate("/catalog")}>Catalog</Button>
        </>
      ) : null}
    </Container>
  );
};

export default ServerError;
