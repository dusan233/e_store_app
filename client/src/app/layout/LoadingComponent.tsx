import { Backdrop, Box, CircularProgress } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Backdrop open={true} invisible>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={50} color="info" />
      </Box>
    </Backdrop>
  );
};

export default LoadingComponent;
