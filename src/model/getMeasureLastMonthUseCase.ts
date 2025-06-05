import { findMeasurementsByYearMonthAndRoom } from "../infrastructure/api/measure/measurementApiRoom";
import { ReadingEntity } from "./measure";

export const getLastMeasureByRoom = async (
  year: number,
  month: number,
  roomId: string
): Promise<ReadingEntity> => {
  let monthPrevious = month - 1;
  let yearPrevious = year;
  if (monthPrevious <= 0) {
    monthPrevious = 12;
    yearPrevious = yearPrevious - 1;
  }
  return await findMeasurementsByYearMonthAndRoom(
    yearPrevious,
    monthPrevious,
    roomId
  );
};
