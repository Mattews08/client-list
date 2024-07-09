// src/tests/ClientList.test.tsx

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store/store";
import ClientList from "../pages/ClientList";

test("renders client list", () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ClientList />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText(/Clientes/i)).toBeInTheDocument();
});
