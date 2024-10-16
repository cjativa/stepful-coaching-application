import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter } from "react-router-dom";

import {
  LoginPage,
  CoachBookingPage,
  StudentBookingPage,
  ProtectedRoute,
} from "./pages";
import { AuthenticationProvider } from "./contexts";

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
    <AuthenticationProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledBackground>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/booking/coach" element={<CoachBookingPage />} />
                <Route
                  path="/booking/student"
                  element={<StudentBookingPage />}
                />
              </Route>
            </Routes>
          </StyledBackground>
        </LocalizationProvider>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};
