import { LightMeasurement } from "../../../model/lightMeasurement";
import apiClient from "../config/apiClient";

export const fetchMeasurements = async (
  year: number,
  month: number
): Promise<LightMeasurement[]> => {
  try {
    const response = await apiClient.get<LightMeasurement[]>("/readings", {
      params: { year, month },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching measurements:", error);
    throw error;
  }
};
