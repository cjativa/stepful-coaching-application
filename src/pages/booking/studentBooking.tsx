import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import {
  ApiService,
  ScheduleItemWithAdditionalInformation,
} from "../../services";
import { useAuthentication } from "../../hooks";
import {
  AvailableScheduleItemList,
  StudentScheduleItemList,
} from "./scheduleList";

const StyledBookingContainer = styled(Paper)(({ theme }) => ({
  minWidth: "400px",
  minHeight: "600px",

  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const StyledSchedulingContainer = styled(Box)(({ theme }) => ({
  margin: "1em 0",
  display: "flex",
  flexDirection: "column",
  rowGap: "1em",
}));

export const StudentBooking = () => {
  const navigate = useNavigate();
  const authentication = useAuthentication();
  const logout = authentication.logout;
  const user = authentication.user!;

  const [scheduleList, setScheduleList] = React.useState<
    Array<ScheduleItemWithAdditionalInformation>
  >([]);
  const [studentScheduleList, setStudentScheduleList] = React.useState<
    Array<ScheduleItemWithAdditionalInformation>
  >([]);

  const [selectedSchedule, setSelectedSchedule] =
    React.useState<ScheduleItemWithAdditionalInformation | null>(null);

  React.useEffect(() => {
    if (user) {
      const fetchScheduleList = async () => {
        const { currentAvailableScheduleList, studentBookedScheduleList } =
          await ApiService.fetchScheduleListForStudent(user.id);

        setScheduleList(currentAvailableScheduleList);
        setStudentScheduleList(studentBookedScheduleList);
      };
      fetchScheduleList();
    }
  }, [user]);

  /** Handler for when an availability slot is booked by the student */
  async function handleBookSlotClick() {
    if (selectedSchedule) {
      try {
        await ApiService.handleBookingForStudent(user.id, selectedSchedule.id);
        // Following success of it, we'll retrieve the latest schedule list
        const { studentBookedScheduleList, currentAvailableScheduleList } =
          await ApiService.fetchScheduleListForStudent(user.id);

        setSelectedSchedule(null);
        setScheduleList(currentAvailableScheduleList);
        setStudentScheduleList(studentBookedScheduleList);
      } catch (error) {
        console.error(
          `[StudentBooking] An error occurred retrieving updated schedule list`
        );
      }
    }
  }

  /** Handles logging out the signed-in coach user and returning to sign-in
   */
  function handleLogoutClick() {
    logout();
    navigate("/login");
  }

  return (
    <Stack>
      <StyledBookingContainer variant="outlined">
        <StyledSchedulingContainer>
          <Typography variant="body1">Hello Student {user?.name}</Typography>
          <Typography variant="body1">
            Book an appointment with a coach from the availability list below
          </Typography>
          <AvailableScheduleItemList
            scheduleList={scheduleList}
            selectedSchedule={selectedSchedule}
            onSelectedSchedule={(schedule) => setSelectedSchedule(schedule)}
          />
          <Button
            variant={"contained"}
            onClick={handleBookSlotClick}
            disabled={selectedSchedule === null}
          >
            Book Selected Appointment
          </Button>
        </StyledSchedulingContainer>

        <hr />

        <StyledSchedulingContainer>
          <Typography variant="body1">Your booked appointments</Typography>
          <StudentScheduleItemList scheduleList={studentScheduleList} />
        </StyledSchedulingContainer>

        <Button variant={"contained"} onClick={handleLogoutClick}>
          Sign out
        </Button>
      </StyledBookingContainer>
    </Stack>
  );
};
