import { useEffect, useState } from "react";
import { getPayments } from "../../model/calculateTotalUseCase";
import { TotalMeasurement } from "../../model/totalMeasurement";
import useSetting from "./useSetting";

const useMeasurements = (year: number, month: number) => {
  const [totalMeasurement, setTotalMeasurement] = useState<TotalMeasurement>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: setting } = useSetting();

  useEffect(() => {
    const getTotalMeasurement = async () => {
      try {
        setLoading(true);
        const data = await getPayments(year, month, setting);
        setTotalMeasurement(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    if (year && month && setting) {
      getTotalMeasurement();
    }
  }, [year, month, setting]);

  return { totalMeasurement, loading, error };
};

export default useMeasurements;
