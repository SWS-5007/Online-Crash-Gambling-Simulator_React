import React from "react";
import { useTheme, Chip } from "@mui/material";

export const Label1Del = ({ label, handleDelete }) => {
  const theme = useTheme();

  return (
    <Chip
      label={label}
      size="small"
      color="primary"
      onDelete={handleDelete}
      sx={{
        color: theme.labels.fontColor,
        padding: "3px",
        borderRadius: "5px",
        backgroundColor: theme.labels.backgroundColor,
        fontWeight: theme.labels.fontWeight,
        cursor: "pointer",
        "& .MuiChip-label": {
          paddingBottom: "1px",
        },
        "& .MuiChip-deleteIcon": {
          color: "#222",
        },
        ":hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      }}
    />
  );
};
