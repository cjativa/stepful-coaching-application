import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LoginPage } from "./pages";
import { CoachBooking } from "./pages/booking";

const StyledBackground = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  background: "#7c8ef2",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const Application = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledBackground>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/booking/coach" element={<CoachBooking />} />
        </Routes>
      </StyledBackground>
    </LocalizationProvider>
  );
};
