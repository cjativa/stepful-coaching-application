import express from "express";
import dayjs from "dayjs";

import { ScheduleService } from "../services";

export class ScheduleController {
  /** Separate class to handle the request and responses from our Express server
   * We have this as a distinct class to enable us to perform initial validation of
   * incoming request payloads before moving onto the business logic layer
   */

  public static async handleCreate(
    request: express.Request,
    response: express.Response
  ) {
    try {
      const coachId = request.body.coachId;
      const startTime = new Date(request.body.startTime);
      const endTime = new Date(request.body.endTime);

      const scheduleItem = await ScheduleService.handleCreate(
        coachId,
        startTime,
        endTime
      );

      return response.status(200).json({
        startTime: scheduleItem.startTime,
        endTime: scheduleItem.endTime,
        id: scheduleItem.id,
      });
    } catch (error) {
      return response
        .status(400)
        .json("Could not create schedule item for coach");
    }
  }

  public static async handleFetchForCoach(
    request: express.Request,
    response: express.Response
  ) {
    try {
      const coachId = request.body.coachId;
      const scheduleItemList = await ScheduleService.handleFetchForCoach(
        coachId
      );

      return response.status(200).json(scheduleItemList);
    } catch (error) {
      return response
        .status(400)
        .json("Could not retrieve schedule list for specified coach");
    }
  }

  public static async handleFetchForStudent(
    request: express.Request,
    response: express.Response
  ) {
    try {
      const studentId = request.body.studentId;
      const scheduleItemList = await ScheduleService.handleFetchForStudent(
        studentId
      );

      return response.status(200).json(scheduleItemList);
    } catch (error) {
      return response
        .status(400)
        .json("Could not retrieve schedule list for student");
    }
  }

  public static async handleBook(
    request: express.Request,
    response: express.Response
  ) {
    return response.status(200).json({});
  }

  public static async handleCompletion(
    request: express.Request,
    response: express.Response
  ) {
    return response.status(200).json({});
  }
}
