import styled from "styled-components";
import { Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const StyledContainer = styled(Container)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  align-items: center;
  margin-top: 30px;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled(Typography)`
  color: #000000;
  text-align: center;
  margin-bottom: 20px;
`;

export const BackLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  margin-bottom: 16px;

  svg {
    margin-right: 8px;
  }

  &:hover {
    text-decoration: none;
  }
`;
