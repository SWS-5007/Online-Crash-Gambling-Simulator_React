import { styled, AccordionSummary } from "@mui/material";

export const SidebarAccordionSummary = styled(AccordionSummary)(
  ({ theme }) => ({
    "&.MuiAccordionSummary-root": {
      minHeight: "46px",
      maxHeight: "46px",
      backgroundColor: "#24262b",
      padding: "0px",
      fontSize: "18px",
      fontWeight: "400",
      color: theme.sidebar.color,
    },
    "& .MuiAccordionSummary-content": {
      margin: "0px",
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "0px",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {},
  })
);
