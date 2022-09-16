import { Container, Paper, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container component={Paper}>
      <Typography gutterBottom variant="h3">
        Opss we could not find what you are looking for.
      </Typography>
    </Container>
  );
};

export default NotFound;
