import { LightMeasurement } from "./lightMeasurement";

export interface TotalMeasurement {
  measurements: LightMeasurement[];
  totalWaterPayment: number;
  totalWaterConsumption: number;
  totalLightPayment: number;
  totalLightConsumption: number;
}
