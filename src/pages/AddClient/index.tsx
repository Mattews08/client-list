import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { createClientThunk } from "../../store/clientsReducer";
import { Client } from "../../types";
import { useAppDispatch } from "../../hooks/useCustomHook";
import { TextField } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import {
  StyledContainer,
  StyledForm,
  GridItem,
  Title,
  BackLink,
} from "./style";
import Button from "../../components/Button";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Endereço de e-mail inválido"),
  phone: z
    .string()
    .min(10, "O número de telefone deve ter pelo menos 10 dígitos"),
  cpf: z.string().length(11, "O CPF deve ter exatamente 11 dígitos"),
});

const AddClient: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>({
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: Client) => {
    dispatch(createClientThunk(data));
    navigate("/");
  };

  return (
    <StyledContainer>
      <BackLink to="/">
        <FaArrowLeft />
      </BackLink>
      <Title variant="h4" gutterBottom>
        Adicionar Cliente
      </Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <GridItem>
          <TextField
            label="Nome"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            fullWidth
          />
        </GridItem>
        <GridItem>
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            fullWidth
          />
        </GridItem>
        <GridItem>
          <TextField
            label="Telefone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
            fullWidth
          />
        </GridItem>
        <GridItem>
          <TextField
            label="CPF"
            {...register("cpf")}
            error={!!errors.cpf}
            helperText={errors.cpf ? errors.cpf.message : ""}
            fullWidth
          />
        </GridItem>
        <GridItem style={{ gridColumn: "span 2" }}>
          <Button type="submit" variant="contained" fullWidth>
            Adicionar Cliente
          </Button>
        </GridItem>
      </StyledForm>
    </StyledContainer>
  );
};

export default AddClient;
