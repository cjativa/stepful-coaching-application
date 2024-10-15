import axios from "axios";

import { LocalStorageService as Storage } from "./localService";

type LocalStorageCoachSchedules = {
  [coachId: string]: Array<ScheduleItem>;
};

export type BookedScheduleItem =
  | {
      booked: true;

      /** The identifier of the student that booked that schedule slot. It will be
       * null if this schedule slot has not yet been booked
       */
      bookedStudentId: string;
    }
  | {
      booked: false;
      bookedStudentId: null;
    };

export type ScheduleItem = {
  /** The start time of the schedule slot */
  startTime: string;

  /** The end time of the schedule slot. As of current, 2-hours after the start time */
  endTime: string;

  /** Whether or not this particular schedule slot has been booked yet */
  booked: boolean;
};

export class ApiService {
  public static async fetchSchedule(
    coachId: string
  ): Promise<Array<BookedScheduleItem>> {
    return [];
  }

  public static async addScheduleSlot(
    coachId: string,
    scheduleItem: ScheduleItem
  ) {
    // Handle where there is no schedule list for this coach yet
    const coachKey = `coach_${coachId}`;
    if (Storage.getItem(coachKey) === undefined) {
      Storage.setItem(coachKey, []);
    }
    const schedule = Storage.getItem(coachKey) as Array<ScheduleItem>;
    const updatedSchedule = schedule.concat([scheduleItem]);

    Storage.setItem(coachKey, updatedSchedule);
    return updatedSchedule;
  }

  public static async handleUserLogin(name: string, type: "student" | "coach") {
    const response = await axios({
      method: "POST",
      baseURL: "/api",
      url: `/login/${type}`,
      data: {
        username: name,
      },
    });

    return response.data;
  }
}
