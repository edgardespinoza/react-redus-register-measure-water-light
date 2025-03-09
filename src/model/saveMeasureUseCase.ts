import { saveMeasureApi } from "../infraestructure/api/measure/saveMeasureApi";
import { LightMeasurement } from "./lightMeasurement";

export const saveMeasure = async (
  measurement: LightMeasurement
): Promise<boolean> => {
  return await saveMeasureApi(measurement);
};
