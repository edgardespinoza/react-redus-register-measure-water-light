import { LightMeasurement } from "../../../model/lightMeasurement";

export interface MeasureDTO {
  roomId: string;
  meterWater: number;
  meterLight: number;
  rent: number;
  year: number;
  month: number;
}

export const toMeasureDTO = (measurement: LightMeasurement): MeasureDTO => {
  return {
    roomId: measurement.room.id,
    meterWater: measurement.meterWaterCurrent,
    meterLight: measurement.meterLightCurrent,
    rent: measurement.rent,
    year: measurement.year,
    month: measurement.month,
  };
};
