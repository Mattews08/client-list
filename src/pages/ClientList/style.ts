import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const AddClientLink = styled(Link)`
  display: inline-block;
  margin: 16px 0;
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  &:hover {
    background-color: #303f9f;
    color: white;
  }
`;

export const Title = styled(Typography)`
  color: #000000;
  text-align: center;
  margin-bottom: 20px;
`;
