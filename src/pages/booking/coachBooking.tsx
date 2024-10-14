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
  const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(
    dayjs("2024-10-01T15:30")
  );
  const [endDateValue, setEndDateValue] = React.useState<Dayjs | null>(
    dayjs("2024-10-01T15:30")
  );

  /** Creates a new date that is 2-hours after the provided start date
   * @param startDate - The date to be used for the 2-hour offset
   */
  function generateEndTime(startDate: Dayjs): Dayjs {
    return startDate.add(2, "hours");
  }

  /** Handles change events for the time-picker. It will also
   * update the end time appropriately to ensure 2-hour window strictness
   * @param newTimeValue - The new date time value
   */
  function handleTimeChange(newTimeValue: Dayjs) {
    const newEndTime = generateEndTime(newTimeValue);

    // Update the start time and end time to reflect the changes
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
  function handleAddSlotClick() {
    console.log(`
      Slot Start: ${startDateValue?.toISOString()}
      Slot End: ${endDateValue?.toISOString()}
      `);
  }

  return (
    <Stack>
      <StyledBookingContainer variant="outlined">
        <Typography variant="body1">Hello Coach "INSERT_NAME_HERE"</Typography>
        <Typography variant="body1">
          Please add some of your availability below
        </Typography>
        <StyledSchedulingContainer>
          <DatePicker
            label="Date"
            value={startDateValue}
            onChange={(value) => value && handleDateChange(value)}
          />{" "}
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
        </StyledSchedulingContainer>
      </StyledBookingContainer>
    </Stack>
  );
};
