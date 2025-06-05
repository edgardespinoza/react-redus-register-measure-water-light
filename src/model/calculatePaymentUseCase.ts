export interface MeasurementPrice {
  meterLightCurrent: number | string;
  meterLightBefore: number | string;
  meterWaterCurrent: number | string;
  meterWaterBefore: number | string;
  rent: number | string;
  priceLight: number | string;
  priceWater: number | string;
}
export interface PaymentResults {
  paymentLight: number;
  paymentWater: number;
  totalPayment: number;
}

export const calculatePayment = (
  measurement: MeasurementPrice
): PaymentResults => {
  const {
    meterLightCurrent,
    meterLightBefore,
    meterWaterCurrent,
    meterWaterBefore,
    rent,
    priceLight,
    priceWater,
  } = measurement;

  const currentLight = safeNumber(meterLightCurrent);
  const previousLight = safeNumber(meterLightBefore);
  const currentWater = safeNumber(meterWaterCurrent);
  const previousWater = safeNumber(meterWaterBefore);
  const lightPrice = safeNumber(priceLight);
  const waterPrice = safeNumber(priceWater);
  const rentAmount = safeNumber(rent);

  const paymentLight = (currentLight - previousLight) * lightPrice;
  const paymentWater = (currentWater - previousWater) * waterPrice;
  const totalPayment = paymentLight + paymentWater + rentAmount;

  return {
    paymentLight,
    paymentWater,
    totalPayment,
  };
};

const safeNumber = (value: string | number | undefined | null): number => {
  if (value === undefined || value === null) return 0;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};
