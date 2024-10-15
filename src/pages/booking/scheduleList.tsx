import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BookedScheduleItem, ScheduleItem } from "../../services";
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
