import { prismaClient } from "./prismaClient";

export class ScheduleService {
  /** Performs creation of a new schedule item for a Coach */
  public static async handleCreate(
    coachId: string,
    startTime: Date,
    endTime: Date
  ) {
    const scheduleItem = await prismaClient.coachSchedule.create({
      data: {
        coachId,
        startTime,
        endTime,
      },
    });

    return scheduleItem;
  }

  /** Performs retrieval of the existing schedule items for a Coach */
  public static async handleFetchForCoach(coachId: string) {
    const scheduleItemList = await prismaClient.coachSchedule.findMany({
      where: {
        coachId,
      },
    });

    return scheduleItemList;
  }
}
