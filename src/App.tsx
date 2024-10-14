import React from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages";

export const Application = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
