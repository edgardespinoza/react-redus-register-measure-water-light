import { fetchMeasurements } from "../infraestructure/api/measure/measurementApi";
import { fetchSettingApi } from "../infraestructure/setting/settingGetApi";
import { Setting } from "./setting";
import { TotalMeasurement } from "./totalMeasurement";

export const getPayments = async (
  year: number,
  month: number,
  setting?: Setting
): Promise<TotalMeasurement> => {
  if (!setting) {
    setting = await fetchSettingApi();
  }

  const measurements = await fetchMeasurements(year, month);

  measurements.map((measurement) => {
    const meterLightCurrent = Number(measurement.meterLightCurrent);
    const meterLightBefore = Number(measurement.meterLightBefore);
    const meterWaterCurrent = Number(measurement.meterWaterCurrent);
    const meterWaterBefore = Number(measurement.meterWaterBefore);
    const rent = Number(measurement.rent);
    const priceLight = Number(setting.priceLight);
    const priceWater = Number(setting.priceWater);

    measurement.paymentLight =
      (meterLightCurrent - meterLightBefore) * priceLight;

    measurement.paymentWater =
      (meterWaterCurrent - meterWaterBefore) * priceWater;

    measurement.totalPayment =
      measurement.paymentLight + measurement.paymentWater + rent;

    return measurement;
  });

  return {
    measurements: measurements,
    totalLightPayment: measurements.reduce(
      (acc, measurement) => acc + measurement.paymentLight,
      0
    ),
    totalLightConsumption: measurements.reduce(
      (acc, measurement) => acc + measurement.meterLightCurrent,
      0
    ),
    totalWaterPayment: measurements.reduce(
      (acc, measurement) => acc + measurement.paymentWater,
      0
    ),
    totalWaterConsumption: measurements.reduce(
      (acc, measurement) => acc + measurement.meterWaterCurrent,
      0
    ),
  };
};
