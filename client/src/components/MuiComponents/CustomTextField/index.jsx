import { styled, TextField } from "@mui/material";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  mt: "5px",
  "&.MuiFormControl-root": {
    "& label": {
      transform: "translate(14px, 14px) scale(1)",
    },
    "& label.MuiInputLabel-shrink": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
    "& label.Mui-focused": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },

  "& .MuiFormLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 14px",
  },
  "& .MuiFormLabel-root-MuiInputLabel-root": {
    transform: "translate(14px, 14px) scale(1)",
  },
}));
