import { LightMeasurement } from "../../../model/lightMeasurement";
import apiClient from "../config/apiClient";
import { toMeasureDTO } from "./measureDTO";

export const saveMeasureApi = async (
  measurement: LightMeasurement
): Promise<boolean> => {
  try {
    const measureDTO = toMeasureDTO(measurement);

    const response = await apiClient.post("/reading", measureDTO);
    return response.status === 201;
  } catch (error) {
    console.error("Error saving measurement:", error);
    throw error;
  }
};
