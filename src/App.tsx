import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientList from "./pages/ClientList";
import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientList />} />
      <Route path="/add" element={<AddClient />} />
      <Route path="/edit/:id" element={<EditClient />} />
    </Routes>
  );
};

export default App;
