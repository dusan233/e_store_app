import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  children: string;
  path: string;
}

const NavigationLink = ({ children, path }: Props) => {
  return (
    <Link to={path}>
      <Button variant="outlined" size="large" sx={{ color: "white" }}>
        {children}
      </Button>
    </Link>
  );
};

export default NavigationLink;
