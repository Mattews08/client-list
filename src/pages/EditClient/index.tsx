import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { getClientThunk, updateClientThunk } from "../../store/clientsReducer";
import { Client } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/useCustomHook";
import { TextField } from "@mui/material";
import { StyledContainer, StyledForm, GridItem, Title } from "./style";
import Button from "../../components/Button";
import { BackLink } from "../AddClient/style";
import { FaArrowLeft } from "react-icons/fa";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Endereço de e-mail inválido"),
  phone: z
    .string()
    .min(10, "O número de telefone deve ter pelo menos 10 dígitos"),
  cpf: z.string().length(11, "O CPF deve ter exatamente 11 dígitos"),
});

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { client, loading, error } = useAppSelector((state) => state.clients);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Client>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (id) {
      dispatch(getClientThunk(parseInt(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (client) {
      reset(client);
    }
  }, [client, reset]);

  const onSubmit = (data: Client) => {
    if (id) {
      dispatch(updateClientThunk({ ...data, id: parseInt(id) }));
      navigate("/");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao buscar cliente</div>;

  return (
    <StyledContainer>
      <BackLink to="/">
        <FaArrowLeft />
      </BackLink>
      <Title variant="h4" gutterBottom>
        Editar Cliente
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
            Atualizar Cliente
          </Button>
        </GridItem>
      </StyledForm>
    </StyledContainer>
  );
};

export default EditClient;
