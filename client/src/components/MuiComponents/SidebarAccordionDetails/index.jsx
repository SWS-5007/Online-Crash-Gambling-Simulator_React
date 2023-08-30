import { styled, AccordionDetails } from "@mui/material";

export const SidebarAccordionDetails = styled(AccordionDetails)(
  ({ theme }) => ({
    "&.MuiAccordionDetails-root": {
      padding: "0px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  })
);
