import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import {
  type ScheduleItemForCoach,
  type ScheduleItemWithAdditionalInformation,
} from "../../services";
import dayjs from "dayjs";

export const ScheduleList = (props: {
  scheduleList: Array<ScheduleItemForCoach>;
}) => {
  const { scheduleList } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Available</TableCell>
            <TableCell align="right">Booked Student Name</TableCell>
            <TableCell align="right">Booked Student Phone #</TableCell>
          </TableRow>
        </TableHead>

        {/** Iterate through the schedule items to populate our table */}
        <TableBody>
          {scheduleList.map((scheduleItem, index) => (
            <TableRow
              key={`${scheduleItem.startTime}_${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {dayjs(scheduleItem.startTime).format("dddd, MMMM D YYYY")}
              </TableCell>

              <TableCell align="right">
                {dayjs(scheduleItem.startTime).format("h:mm A")}
              </TableCell>
              <TableCell align="right">
                {dayjs(scheduleItem.endTime).format("h:mm A")}
              </TableCell>
              <TableCell align="right">
                {scheduleItem.booked ? "No" : "Yes"}
              </TableCell>
              <TableCell align="right">
                {scheduleItem.bookedStudent?.name}
              </TableCell>
              <TableCell align="right">
                {scheduleItem.bookedStudent?.phoneNumber}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const AvailableScheduleItemList = (props: {
  scheduleList: Array<ScheduleItemWithAdditionalInformation>;
  onSelectedSchedule: (
    scheduleItem: ScheduleItemWithAdditionalInformation | null
  ) => void;
  selectedSchedule: ScheduleItemWithAdditionalInformation | null;
}) => {
  const { scheduleList, onSelectedSchedule, selectedSchedule } = props;

  const handleSelectClick = (
    schedule: ScheduleItemWithAdditionalInformation
  ) => {
    // If the schedule being selected is the same as the current
    // selected schedule id, then end-user probably wants to deselect
    if (selectedSchedule?.id === schedule.id) {
      onSelectedSchedule(null);
    } else {
      onSelectedSchedule(schedule);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coach</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Selected</TableCell>
          </TableRow>
        </TableHead>

        {/** Iterate through the schedule items to populate our table */}
        <TableBody>
          {scheduleList.map((scheduleItem, index) => (
            <TableRow
              key={`${scheduleItem.startTime}_${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {scheduleItem.coach.name}
              </TableCell>
              <TableCell align="left">
                {dayjs(scheduleItem.startTime).format("dddd, MMMM D YYYY")}
              </TableCell>

              <TableCell align="right">
                {dayjs(scheduleItem.startTime).format("h:mm A")}
              </TableCell>
              <TableCell align="right">
                {dayjs(scheduleItem.endTime).format("h:mm A")}
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  color="primary"
                  checked={scheduleItem.id === selectedSchedule?.id}
                  disabled={scheduleItem.booked}
                  onChange={() => handleSelectClick(scheduleItem)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const StudentScheduleItemList = (props: {
  scheduleList: Array<ScheduleItemWithAdditionalInformation>;
}) => {
  const { scheduleList } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coach</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Coach Phone Number</TableCell>
          </TableRow>
        </TableHead>

        {/** Iterate through the schedule items to populate our table */}
        <TableBody>
          {scheduleList.map((scheduleItem, index) => (
            <TableRow
              key={`${scheduleItem.startTime}_${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {scheduleItem.coach.name}
              </TableCell>
              <TableCell align="left">
                {dayjs(scheduleItem.startTime).format("dddd, MMMM D YYYY")}
              </TableCell>

              <TableCell align="right">
                {dayjs(scheduleItem.startTime).format("h:mm A")}
              </TableCell>
              <TableCell align="right">
                {dayjs(scheduleItem.endTime).format("h:mm A")}
              </TableCell>
              <TableCell align="right">
                {scheduleItem.coach.phoneNumber}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
