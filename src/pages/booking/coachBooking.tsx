import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { type Dayjs } from "dayjs";
import Button from "@mui/material/Button";

import {
  type BookedScheduleItem,
  type ScheduleItem,
  CoachService,
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

export const CoachBooking = () => {
  const defaultStartDate = dayjs("2024-10-01T15:30");
  const defaultEndDate = TimeUtilities.generateEndTime(defaultStartDate);
  const { user } = useAuthentication();

  const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(
    defaultStartDate
  );
  const [endDateValue, setEndDateValue] = React.useState<Dayjs | null>(
    defaultEndDate
  );
  const [scheduleList, setScheduleList] = React.useState<Array<ScheduleItem>>(
    []
  );
  const [appointmentError, setAppointmentError] = React.useState(false);

  /** Handles change events for the time-picker. It will also
   * update the end time appropriately to ensure 2-hour window strictness
   * @param newTimeValue - The new date time value
   */
  function handleTimeChange(newTimeValue: Dayjs) {
    const newEndTime = TimeUtilities.generateEndTime(newTimeValue);

    // Update the start time and end time to reflect the changes
    // We'll also reset the existence of a slot error
    setAppointmentError(false);
    setStartDateValue(newTimeValue);
    setEndDateValue(newEndTime);
  }

  /** Handles change events for the date-picker.
   * @param newDateValue - The new date time value
   */
  function handleDateChange(newDateValue: Dayjs) {
    setStartDateValue(newDateValue);
  }

  /** Handler for when an availability slot is added */
  async function handleAddSlotClick() {
    if (!startDateValue || !endDateValue) {
      return;
    }

    // We'll check if start date and end date being tentatively added
    // would trigger an overlap with an existing schedule item.
    // If that happens to be the case, we will indicate an error
    const scheduleOverlapExists = TimeUtilities.determineIfScheduleOverlaps(
      { startTime: startDateValue, endTime: endDateValue },
      scheduleList
    );
    if (scheduleOverlapExists) {
      setAppointmentError(true);
      return;
    }

    // We'll sort the list to keep the UI rendering the schedule items in order
    const updatedScheduleList = scheduleList
      .concat([
        {
          startTime: startDateValue.toISOString(),
          endTime: endDateValue.toISOString(),
          booked: false,
        },
      ])
      .sort((itemOne, itemTwo) => {
        const itemOneStart = dayjs(itemOne.startTime);
        const itemTwoStart = dayjs(itemTwo.startTime);

        if (itemOneStart.isBefore(itemTwoStart)) {
          return -1;
        }
        if (itemOneStart.isAfter(itemTwoStart)) {
          return 1;
        }
        return 0;
      });
    setScheduleList(updatedScheduleList);
  }

  return (
    <Stack>
      <StyledBookingContainer variant="outlined">
        <Typography variant="body1">Hello Coach {user?.name}</Typography>
        <Typography variant="body1">
          Please add some of your availability below
        </Typography>
        <StyledSchedulingContainer>
          <DatePicker
            label="Date"
            value={startDateValue}
            onChange={(value) => value && handleDateChange(value)}
          />
          <TimePicker
            label="Start Time"
            value={startDateValue}
            onChange={(value) => value && handleTimeChange(value)}
          />
          <TimeField
            label="End Time"
            value={endDateValue}
            onChange={(newValue) => setStartDateValue(newValue)}
            readOnly
          />
          <Button variant={"contained"} onClick={handleAddSlotClick}>
            Add Availability Slot
          </Button>

          {/** Render the text indicating an appointment overlap error */}
          {appointmentError ? (
            <Typography color="red">
              Could not create appointment slot for the selected time. An
              appointment slot already exists
            </Typography>
          ) : null}
        </StyledSchedulingContainer>

        <hr />

        <StyledSchedulingContainer>
          <Typography variant="body1">View your Availability below</Typography>
          <ScheduleList scheduleList={scheduleList} />
        </StyledSchedulingContainer>
      </StyledBookingContainer>
    </Stack>
  );
};
