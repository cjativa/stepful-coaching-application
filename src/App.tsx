import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter } from "react-router-dom";

import { LoginPage } from "./pages";
import { CoachBooking, StudentBooking } from "./pages/booking";
import { LocalStorageService } from "./services";
import { AuthenticationProvider } from "./contexts";
import { COACHES, STUDENTS } from "./constants";

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
  React.useEffect(() => {
    // Only seed the database if it isn't already seeded
    const applicationKey = `app`;
    const coachesKey = `coaches`;
    const studentsKey = `students`;

    if (localStorage.getItem(applicationKey) === null) {
      console.log(`Initializing local storage`);
      LocalStorageService.setItem(coachesKey, COACHES);
      LocalStorageService.setItem(studentsKey, STUDENTS);
    }
  }, []);

  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledBackground>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/booking/coach" element={<CoachBooking />} />
              <Route path="/booking/student" element={<StudentBooking />} />
            </Routes>
          </StyledBackground>
        </LocalizationProvider>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};
