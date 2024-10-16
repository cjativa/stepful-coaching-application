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
  ScheduleItem,
  ScheduleItemWithAdditionalInformation,
} from "../../services";
import dayjs from "dayjs";

export const ScheduleList = (props: { scheduleList: Array<ScheduleItem> }) => {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const ScheduleListForStudent = (props: {
  scheduleList: Array<ScheduleItemWithAdditionalInformation>;
  onSelectedSchedule: (
    scheduleItem: ScheduleItemWithAdditionalInformation | null
  ) => void;
}) => {
  const { scheduleList, onSelectedSchedule } = props;
  const [selectedScheduleId, setSelectedScheduleId] = React.useState<
    number | null
  >(null);

  const handleSelectClick = (
    selectedSchedule: ScheduleItemWithAdditionalInformation
  ) => {
    // If the schedule being selected is the same as the current
    // selected schedule id, then end-user probably wants to deselect
    if (selectedScheduleId === selectedSchedule.id) {
      setSelectedScheduleId(null);
      onSelectedSchedule(null);
    } else {
      setSelectedScheduleId(selectedSchedule.id);
      onSelectedSchedule(selectedSchedule);
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
            <TableCell align="right">Available</TableCell>
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
                {scheduleItem.booked ? "No" : "Yes"}
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  color="primary"
                  checked={scheduleItem.id === selectedScheduleId}
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
