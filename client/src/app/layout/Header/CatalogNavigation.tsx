import { Box, Container, Stack } from "@mui/material";
import CatalogNavigationItem from "./CatalogNavigationItem";
import pcLogo from "../../images/pc-logo.png";
import playstationLogo from "../../images/playstation-logo.png";
import xboxLogo from "../../images/xbox-logo.png";
import nintendoLogo from "../../images/nintendo-logo.png";
import { playstation, xbox, nintendo, pc } from "./catalogNavigationData";

const CatalogNavigation = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        p: 0.8,
        color: "black",
      }}
    >
      <Container>
        <Stack direction="row" spacing={0.8}>
          <CatalogNavigationItem text="All Products" />
          <CatalogNavigationItem
            content={playstation}
            text="PLAYSTATION"
            icon={playstationLogo}
          />
          <CatalogNavigationItem content={xbox} text="XBOX" icon={xboxLogo} />
          <CatalogNavigationItem
            text="NINTENDO"
            content={nintendo}
            icon={nintendoLogo}
          />
          <CatalogNavigationItem content={pc} text="PC" icon={pcLogo} />
        </Stack>
      </Container>
    </Box>
  );
};

export default CatalogNavigation;
