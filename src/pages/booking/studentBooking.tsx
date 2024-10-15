import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

import dayjs, { type Dayjs } from "dayjs";
import Button from "@mui/material/Button";

import {
  type BookedScheduleItem,
  type ScheduleItem,
  ApiService,
} from "../../services";
import { useAuthentication } from "../../hooks";
import { ScheduleList } from "./scheduleList";
import { TimeUtilities } from "./timeUtilities";

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
  const { user } = useAuthentication();

  const [scheduleList, setScheduleList] = React.useState<Array<ScheduleItem>>(
    []
  );

  /** Handler for when an availability slot is added */
  async function handleAddSlotClick() {}

  return (
    <Stack>
      <StyledBookingContainer variant="outlined">
        <StyledSchedulingContainer>
          <Typography variant="body1">
            Book an appointment with a coach below
          </Typography>
          <ScheduleList scheduleList={scheduleList} />
        </StyledSchedulingContainer>

        <Button variant={"contained"} onClick={handleAddSlotClick}>
          Book Appointment
        </Button>
      </StyledBookingContainer>
    </Stack>
  );
};
