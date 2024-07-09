import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchClientsThunk,
  deleteClientThunk,
} from "../../store/clientsReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/useCustomHook";
import { Client } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AddClientLink, Title } from "./style";

const ClientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useAppSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClientsThunk());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteClientThunk(id)).then(() => {
      dispatch(fetchClientsThunk());
    });
  };

  const renderClients = () => {
    if (!Array.isArray(clients) || clients.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} style={{ textAlign: "center" }}>
            Nenhum cliente encontrado
          </TableCell>
        </TableRow>
      );
    }

    return clients.map((client: Client) => (
      <TableRow key={client.id}>
        <TableCell>{client.name}</TableCell>
        <TableCell>{client.email}</TableCell>
        <TableCell>{client.phone}</TableCell>
        <TableCell>{client.cpf}</TableCell>
        <TableCell>
          <Link to={`/edit/${client.id}`}>
            <IconButton>
              <FaEdit size={16} />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleDelete(client.id)}>
            <FaTrash size={14} />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Container style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Title variant="h4" gutterBottom>
        Clientes
      </Title>
      <AddClientLink to="/add">Adicionar Cliente</AddClientLink>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading || error ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  {loading ? "Carregando..." : "Erro ao buscar clientes"}
                </TableCell>
              </TableRow>
            ) : (
              renderClients()
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ClientList;
