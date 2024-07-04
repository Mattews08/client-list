import React from "react";
import { ButtonProps } from "@mui/material";
import { StyledButton } from "./style";

const Button: React.FC<ButtonProps> = (props) => <StyledButton {...props} />;

export default Button;
