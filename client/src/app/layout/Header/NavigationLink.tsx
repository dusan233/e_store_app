import { Button } from "@mui/material";

interface Props {
  children: string;
}

const NavigationLink = ({ children }: Props) => {
  return (
    <Button variant="outlined" size="large" sx={{ color: "white" }}>
      {children}
    </Button>
  );
};

export default NavigationLink;
