import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

export const SearchBarComponentTextField = styled(TextField)<TextFieldProps>({
  height: "10%",
  width: "34%",
  paddingRight: "8px",
  input: {
    color: "white",
    borderRadius: "10px",
    backgroundColor: "rgb(0,0,0,0.6)",
  },
  label: {
    color: "white",
  },
});
