import { http, HttpResponse } from "msw";
import { Client } from "../types";

const clients: Client[] = [];

export const handlers = [
  http.get("/clients", () => {
    return HttpResponse.json(clients);
  }),
  http.post("/clients", async ({ request }) => {
    const clientData = (await request.json()) as Client;
    if (!clientData || !clientData.name || !clientData.email) {
      return HttpResponse.json(
        { message: "Invalid client data" },
        { status: 400 }
      );
    }
    const newClient: Client = {
      id: Date.now(),
      name: clientData.name,
      email: clientData.email,
      cpf: clientData.cpf,
      phone: clientData.phone,
    };
    clients.push(newClient);
    return HttpResponse.json(newClient);
  }),
  http.put("/clients/:id", async ({ request, params }) => {
    const { id } = params as { id: string };
    const clientData = (await request.json()) as Client;
    if (!clientData || !clientData.name || !clientData.email) {
      return HttpResponse.json(
        { message: "Invalid client data" },
        { status: 400 }
      );
    }
    const updatedClient: Client = {
      id: parseInt(id),
      name: clientData.name,
      email: clientData.email,
      cpf: clientData.cpf,
      phone: clientData.phone,
    };
    const index = clients.findIndex((client) => client.id === parseInt(id));
    clients[index] = updatedClient;
    return HttpResponse.json(updatedClient);
  }),
  http.delete("/clients/:id", ({ params }) => {
    const { id } = params as { id: string };
    const index = clients.findIndex((client) => client.id === parseInt(id));
    clients.splice(index, 1);
    return HttpResponse.json({}, { status: 204 });
  }),
  http.get("/clients/:id", ({ params }) => {
    const { id } = params as { id: string };
    const client = clients.find((client) => client.id === parseInt(id));
    if (!client) {
      return HttpResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }
    return HttpResponse.json(client);
  }),
];
