export interface LightMeasurement {
  room: {
    name: string;
    id: string;
  };
  meterWaterCurrent: number;
  meterWaterBefore: number;
  paymentWater: number;
  meterLightCurrent: number;
  meterLightBefore: number;
  paymentLight: number;
  totalPayment: number;
  year: number;
  month: number;
  rent: number;
}
