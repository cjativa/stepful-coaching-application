import axios from "axios";

import { LocalStorageService as Storage } from "./localService";

type LocalStorageCoachSchedules = {
  [coachId: string]: Array<ScheduleItem>;
};

type Coach = {
  id: string;
  name: string;
  phoneNumber: string;
};

type Student = {
  id: string;
  name: string;
  phoneNumber: string;
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

export type ScheduleItemWithAdditionalInformation = ScheduleItem & {
  id: number;
  coach: Coach;
  student: Student;
};

export class ApiService {
  public static async fetchSchedule(
    coachId: string
  ): Promise<Array<BookedScheduleItem>> {
    return [];
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

  public static async fetchScheduleListForCoach(coachId: string) {
    const response = await axios({
      method: "POST",
      baseURL: "/api",
      url: `/schedule/coach`,
      data: {
        coachId,
      },
    });

    return response.data;
  }

  public static async fetchScheduleListForStudent(
    studentId: string
  ): Promise<Array<ScheduleItemWithAdditionalInformation>> {
    const response = await axios({
      method: "POST",
      baseURL: "/api",
      url: `/schedule/student`,
      data: {
        studentId,
      },
    });

    return response.data;
  }

  public static async addScheduleSlot(
    coachId: string,
    scheduleItem: ScheduleItem
  ) {
    const response = await axios({
      method: "POST",
      baseURL: "/api",
      url: `/schedule`,
      data: {
        coachId,
        startTime: scheduleItem.startTime,
        endTime: scheduleItem.endTime,
      },
    });

    return response.data;
  }

  public static async handleBookingForStudent(
    studentId: string,
    scheduleItemId: number
  ): Promise<ScheduleItemWithAdditionalInformation> {
    const response = await axios({
      method: "POST",
      baseURL: "/api",
      url: `/schedule/book`,
      data: {
        studentId,
        scheduleItemId,
      },
    });

    return response.data;
  }
}
