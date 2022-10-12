import { Box, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { setProductParams } from "../../../features/catalog/catalogSlice";
import { useAppDispatch } from "../../store/configureStore";

interface Props {
  icon?: string;
  text: string;
  content?:
    | {
        img: string;
        title: string;
        links: { linkTo: string; name: string }[];
      }[];
}

export default function BasicMenu({ icon, text, content }: Props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!content) {
      navigate("/catalog");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        onClick={handleClick}
        sx={{
          color: "black",
          borderRadius: "6px",
          ":hover": {
            background: "rgba(0,0,0,0.2)",
          },
          paddingX: 1.5,
        }}
        startIcon={icon && <img src={icon} />}
        size="large"
      >
        {text}
      </Button>
      {content && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            boxShadow: 0,
          }}
          elevation={1}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Stack direction="row" spacing={3.5}>
              {content?.map((sec) => (
                <Box>
                  <Box>
                    <img src={sec.img} />
                  </Box>

                  <Typography mt={2} fontWeight="bold" color="black">
                    {sec.title}
                  </Typography>

                  <MenuList>
                    {sec.links.map((link) => (
                      <MenuItem
                        onClick={() => {
                          const types = [link.linkTo.split(",")[0]];
                          const types2 = [link.linkTo.split(",")[1]];
                          dispatch(setProductParams({ types, types2 }));
                          navigate("/catalog");
                          handleClose();
                        }}
                      >
                        {link.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Box>
              ))}
            </Stack>
          </Box>
        </Menu>
      )}
    </>
  );
}
