import dayjs, { type Dayjs } from "dayjs";
import { ScheduleItem } from "../../services";

// This file contains utilities for working with our date objects
// and the schedule items for populating an end-users schedule list
// Keeping these as external functions so that we can test them
// outside of the context of React since they are not directly
// tied to state variables within the React components

/** Creates a new date that is 2-hours after the provided start date
 * @param startDate - The date to be used for the 2-hour offset
 */
function generateEndTime(startDate: Dayjs): Dayjs {
  return startDate.add(2, "hours");
}

/** Checks if the provided schedule item has an overlapping time with an
 * existing time slot with one of the items in the provided list
 *
 * Returns true if there is an overlap between the schedule item and list. Otherwise, false
 * @param scheduleItemToCheck - The schedule item to check for overlapping time
 * @param scheduleItemList - The list of schedule items to check for overlap against
 */
function determineIfScheduleOverlaps(
  scheduleItemToCheck: { startTime: Dayjs; endTime: Dayjs },
  scheduleItemList: Array<ScheduleItem>
): boolean {
  // TODO - Optimize below algortihm by sorting the provided schedule item list
  // If our item to check doesn't overlap with the Nth item, then it won't overlap
  // with N + 1 item because N + 1 item is further in time, so it follows that it would not overlap

  const overlapExists = scheduleItemList.some((existingScheduleItem) => {
    const existingItemStart = dayjs(existingScheduleItem.startTime);
    const existingItemEnd = dayjs(existingScheduleItem.endTime);

    // Check if the tentative schedule item overlaps because of start time
    // falling within the start/end range of this existing schedule item
    const overlapBecauseOfStartTime =
      scheduleItemToCheck.startTime.isAfter(existingItemStart) &&
      scheduleItemToCheck.startTime.isBefore(existingItemEnd);

    if (
      overlapBecauseOfStartTime ||
      scheduleItemToCheck.startTime.isSame(existingItemStart) ||
      scheduleItemToCheck.startTime.isSame(existingItemEnd)
    ) {
      return true;
    }

    // Check if the tentative schedule item overlaps because of end time
    // falling within the start/end range of this existing schedule item
    const overlapBecauseOfEndTime =
      scheduleItemToCheck.endTime.isAfter(existingItemStart) &&
      scheduleItemToCheck.endTime.isBefore(existingItemEnd);

    if (
      overlapBecauseOfEndTime ||
      scheduleItemToCheck.endTime.isSame(existingItemStart) ||
      scheduleItemToCheck.endTime.isSame(existingItemEnd)
    ) {
      return true;
    }

    return false;
  });

  return overlapExists;
}

export const TimeUtilities = {
  determineIfScheduleOverlaps,
  generateEndTime,
};
