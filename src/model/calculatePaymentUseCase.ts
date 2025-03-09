import { LightMeasurement } from "../model/lightMeasurement"; // Ajusta la ruta según tu estructura
import { Setting } from "../model/setting"; // Ajusta la ruta según tu estructura

export const calculatePayment = (
  measurement: LightMeasurement,
  setting: Setting
): LightMeasurement => {
  const meterLightCurrent = Number(measurement.meterLightCurrent);
  const meterLightBefore = Number(measurement.meterLightBefore);
  const meterWaterCurrent = Number(measurement.meterWaterCurrent);
  const meterWaterBefore = Number(measurement.meterWaterBefore);
  const priceLight = Number(setting.priceLight);
  const priceWater = Number(setting.priceWater);
  const rent = Number(measurement.rent);

  // Calcular el pago de luz
  measurement.paymentLight =
    (meterLightCurrent - meterLightBefore) * priceLight;

  // Calcular el pago de agua
  measurement.paymentWater =
    (meterWaterCurrent - meterWaterBefore) * priceWater;

  // Calcular el pago total
  measurement.totalPayment =
    measurement.paymentLight + measurement.paymentWater + rent;

  return measurement;
};
