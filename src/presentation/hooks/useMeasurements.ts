import { useEffect, useState } from "react";
import { fetchMeasurements } from "../../infraestructure/api/measure/measurementApi";
import { LightMeasurement } from "../../model/lightMeasurement";

const useMeasurements = (local: string, year: number, month: number) => {
  const [measurements, setMeasurements] = useState<LightMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMeasurements = async () => {
      try {
        const data = await fetchMeasurements(local, year, month);
        setMeasurements(data);
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

    getMeasurements();
  }, [local, year, month]);

  return { measurements, loading, error };
};

export default useMeasurements;
