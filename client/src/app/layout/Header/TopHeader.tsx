import { Box, Typography } from "@mui/material";
import { borderBottom } from "@mui/system";

const TopHeader = () => {
  return (
    <Box sx={{ p: 0.5, borderBottom: "1px solid #2d2e2e" }}>
      <Typography textAlign="center" variant="body1">
        Best prices you can find!
      </Typography>
    </Box>
  );
};

export default TopHeader;
