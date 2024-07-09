import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddClient from "../pages/AddClient";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockStore = configureStore([]);

describe("AddClient", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      clients: {
        clients: [],
        loading: false,
        error: null,
      },
    });
  });

  test("renders add client form", () => {
    const ui = (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/add"]}>
          <Routes>
            <Route path="/add" element={<AddClient />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    render(ui);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Adicionar Cliente/i).length).toBeGreaterThan(0);
  });
});
