import { styled, Button } from "@mui/material";

export const BtnCustom = styled(Button)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  minWidth: "0px",
  backgroundColor: theme.palette.primary.main,
  padding: "12px",
  color: theme.palette.text.primary,
  textTransform: "none",
  ":hover": {
    backgroundColor: theme.palette.primary.hover,
    color: "white",
  },
}));
