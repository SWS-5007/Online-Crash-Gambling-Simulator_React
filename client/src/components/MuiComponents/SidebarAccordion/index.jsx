import { styled, Accordion } from "@mui/material";

export const SidebarAccordion = styled(Accordion)(({ theme }) => ({
  "&.MuiAccordion-root": {
    width: "100%",
    boxShadow: "unset",
    backgroundColor: "transparent",
  },
  "&.MuiAccordion-root.Mui-expanded": {
    display: "flex",
    flexDirection: "column",
    margin: "0px",
  },
  "&.MuiAccordion-root:before": {
    backgroundColor: "unset",
  },
}));
