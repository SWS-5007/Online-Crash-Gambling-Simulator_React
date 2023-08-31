import React from "react";
import { useTheme, Chip } from "@mui/material";

export const Label1 = ({ label }) => {
  const theme = useTheme();

  return (
    <Chip
      label={label}
      size="small"
      color="primary"
      onClick={() => console.log("ClickedLabel", label)}
      sx={{
        color: theme.labels.fontColor,
        padding: "3px",
        borderRadius: "5px",
        backgroundColor: theme.labels.backgroundColor,
        fontWeight: theme.labels.fontWeight,
        cursor: "pointer",
        ":hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      }}
    />
  );
};
