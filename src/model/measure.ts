export type ReadingEntity = {
  id: string;
  meterWater: number;
  meterLight: number;
  rent: number;
  year: number;
  month: number;
  room: {
    name: string;
    id: string;
  };
};
