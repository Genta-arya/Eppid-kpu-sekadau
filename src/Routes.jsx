import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormulirKeberatan from "./View/FormulirKeberatan";
import App from "./App";
import FormulirPermohonanInformasi from "./View/FormulirPermohonanInformasi";
import ProtectedRoute from "./components/ProtectedRoutes";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/formulir-keberatan" element={<FormulirKeberatan />} />
          <Route
            path="/formulir-informasi"
            element={<FormulirPermohonanInformasi />}
          />
        </Routes>
      </ProtectedRoute>
    </BrowserRouter>
  );
};

export default AppRoutes;