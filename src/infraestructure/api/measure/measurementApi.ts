import { LightMeasurement } from "../../../model/lightMeasurement";
import apiConfig from "../config/apiConfig";

export const fetchMeasurements = async (
  local: string,
  year: number,
  month: number
): Promise<LightMeasurement[]> => {
  try {
    const response = await fetch(
      `${apiConfig.baseURL}/measure/search?local=${local}&year=${year}&month=${month}`,
      {
        method: "GET",
        headers: {
          ...apiConfig.headers,
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Inyectar token
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching measurements");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching measurements:", error);
    throw error;
  }
};
