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
  Button,
  Container,
  Typography,
} from "@mui/material";

const ClientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useAppSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClientsThunk());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteClientThunk(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching clients</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Clients
      </Typography>
      <Link to="/add">Add Client</Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(clients) &&
              clients.map((client: Client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.cpf}</TableCell>
                  <TableCell>
                    <Link to={`/edit/${client.id}`}>Edit</Link>
                    <Button onClick={() => handleDelete(client.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ClientList;
