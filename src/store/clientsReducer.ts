import { createSlice, PayloadAction, createAsyncThunk, ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import { Client } from '../types';
import { fetchClients, createClient, updateClient, deleteClient, getClient } from '../services/clientService';

type ClientsState = {
  clients: Client[];
  client?: Client;
  loading: boolean;
  error: string | null;
};

const initialState: ClientsState = {
  clients: [],
  loading: false,
  error: null,
};

export const fetchClientsThunk: AsyncThunk<Client[], void, {}> = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const response = await fetchClients();
    return response;
  }
);

export const createClientThunk: AsyncThunk<Client, Client, {}> = createAsyncThunk(
  'clients/createClient',
  async (client: Client) => {
    const response = await createClient(client);
    return response;
  }
);

export const updateClientThunk: AsyncThunk<Client, Client, {}> = createAsyncThunk(
  'clients/updateClient',
  async (client: Client) => {
    const response = await updateClient(client.id, client);
    return response;
  }
);

export const deleteClientThunk: AsyncThunk<number, number, {}> = createAsyncThunk(
  'clients/deleteClient',
  async (id: number) => {
    await deleteClient(id);
    return id;
  }
);

export const getClientThunk: AsyncThunk<Client, number, {}> = createAsyncThunk(
  'clients/getClient',
  async (id: number) => {
    const response = await getClient(id);
    return response;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ClientsState>) => {
    builder
      .addCase(fetchClientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientsThunk.fulfilled, (state, action: PayloadAction<Client[]>) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch clients';
      })
      .addCase(createClientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClientThunk.fulfilled, (state, action: PayloadAction<Client>) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(createClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create client';
      })
      .addCase(updateClientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClientThunk.fulfilled, (state, action: PayloadAction<Client>) => {
        state.loading = false;
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update client';
      })
      .addCase(deleteClientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClientThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.clients = state.clients.filter(client => client.id !== action.payload);
      })
      .addCase(deleteClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete client';
      })
      .addCase(getClientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientThunk.fulfilled, (state, action: PayloadAction<Client>) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(getClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch client';
      });
  },
});

export default clientsSlice.reducer;
