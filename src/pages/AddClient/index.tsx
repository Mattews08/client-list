import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { createClientThunk } from "../../store/clientsReducer";
import { Client } from "../../types";
import { useAppDispatch } from "../../hooks/useCustomHook";
import { TextField, Button, Container, Typography } from "@mui/material";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  cpf: z.string().length(11, "CPF must be exactly 11 digits"),
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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Client
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            label="Name"
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
            label="Phone"
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
          Add Client
        </Button>
      </form>
    </Container>
  );
};

export default AddClient;
