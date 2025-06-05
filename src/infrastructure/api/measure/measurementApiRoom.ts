import { ReadingEntity } from "../../../model/measure";
import apiClient from "../config/apiClient";

export const findMeasurementsByYearMonthAndRoom = async (
  year: number,
  month: number,
  roomId: string
): Promise<ReadingEntity> => {
  try {
    const response = await apiClient.get<ReadingEntity>(
      `/reading/room/${roomId}`,
      {
        params: { year, month },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching measurements:", error);
    throw error;
  }
};
