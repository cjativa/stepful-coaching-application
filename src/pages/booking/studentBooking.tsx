import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  ApiService,
  ScheduleItemWithAdditionalInformation,
} from "../../services";
import { useAuthentication } from "../../hooks";
import { ScheduleListForStudent } from "./scheduleList";

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
  const user = useAuthentication().user!;

  const [scheduleList, setScheduleList] = React.useState<
    Array<ScheduleItemWithAdditionalInformation>
  >([]);
  const [selectedSchedule, setSelectedSchedule] =
    React.useState<ScheduleItemWithAdditionalInformation | null>(null);

  React.useEffect(() => {
    if (user) {
      const fetchScheduleList = async () => {
        const scheduleList = await ApiService.fetchScheduleListForStudent(
          user.id
        );

        setScheduleList(scheduleList);
      };
      fetchScheduleList();
    }
  }, [user]);

  /** Handler for when an availability slot is added */
  async function handleBookSlotClick() {
    if (selectedSchedule) {
      await ApiService.handleBookingForStudent(user.id, selectedSchedule.id);
    }
  }

  return (
    <Stack>
      <StyledBookingContainer variant="outlined">
        <StyledSchedulingContainer>
          <Typography variant="body1">Hello Student {user?.name}</Typography>
          <Typography variant="body1">
            Book an appointment with a coach below
          </Typography>
          <ScheduleListForStudent
            scheduleList={scheduleList}
            onSelectedSchedule={(scheduleItem) =>
              setSelectedSchedule(scheduleItem)
            }
          />
        </StyledSchedulingContainer>

        <Button
          variant={"contained"}
          onClick={handleBookSlotClick}
          disabled={selectedSchedule === null}
        >
          Book Selected Appointment
        </Button>
      </StyledBookingContainer>
    </Stack>
  );
};
