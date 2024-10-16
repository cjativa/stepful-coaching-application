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

import { ApiService, type ScheduleItemForCoach } from "../../services";
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
  // Default start and end dates for the pickers are current time, and 2-hours from i
  const defaultStartDate = dayjs()
    .set("minute", 0)
    .set("hour", dayjs().hour() + 1);
  const defaultEndDate = TimeUtilities.generateEndTime(defaultStartDate);

  const user = useAuthentication().user!;
  const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(
    defaultStartDate
  );
  const [endDateValue, setEndDateValue] = React.useState<Dayjs | null>(
    defaultEndDate
  );
  const [scheduleList, setScheduleList] = React.useState<
    Array<ScheduleItemForCoach>
  >([]);
  const [appointmentError, setAppointmentError] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      const fetchScheduleList = async () => {
        const updatedScheduleList = await ApiService.fetchScheduleListForCoach(
          user.id
        );

        setScheduleList(updatedScheduleList);
      };

      fetchScheduleList();
    }
  }, [user]);

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
    const newEndTime = TimeUtilities.generateEndTime(newDateValue);

    setAppointmentError(false);
    setStartDateValue(newDateValue);
    setEndDateValue(newEndTime);
  }

  /** Handler for when an availability slot is added */
  async function handleAddSlotClick() {
    if (!startDateValue || !endDateValue) {
      return;
    }

    // We'll check if start date and end date being tentatively added
    // would trigger an overlap with an existing schedule item.
    const scheduleOverlapExists = TimeUtilities.determineIfScheduleOverlaps(
      { startTime: startDateValue, endTime: endDateValue },
      scheduleList
    );

    // If that happens to be the case, we will indicate an error
    if (scheduleOverlapExists) {
      setAppointmentError(true);
      return;
    }
    try {
      // We'll perform our API request to add this schedule item
      await ApiService.addScheduleSlot(user.id, {
        startTime: startDateValue.toISOString(),
        endTime: endDateValue.toISOString(),
        booked: false,
      });

      // Following success of it, we'll retrieve the latest schedule list
      const updatedScheduleList = await ApiService.fetchScheduleListForCoach(
        user.id
      );
      setScheduleList(updatedScheduleList);
    } catch (error) {
      setAppointmentError(true);
    }
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
