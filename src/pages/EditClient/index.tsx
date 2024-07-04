import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { getClientThunk, updateClientThunk } from "../../store/clientsReducer";
import { Client } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/useCustomHook";
import { TextField, Button, Container, Typography } from "@mui/material";

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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Cliente
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            label="Nome"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
        </div>
        <div>
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        </div>
        <div>
          <TextField
            label="Telefone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />
        </div>
        <div>
          <TextField
            label="CPF"
            {...register("cpf")}
            error={!!errors.cpf}
            helperText={errors.cpf ? errors.cpf.message : ""}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Atualizar Cliente
        </Button>
      </form>
    </Container>
  );
};

export default EditClient;
