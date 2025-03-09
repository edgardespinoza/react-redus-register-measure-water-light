import { Setting } from "../../model/setting";
import apiClient from "../api/config/apiClient";

export const fetchSettingApi = async (): Promise<Setting> => {
  try {
    const response = await apiClient.get<Setting>(`/setting`);

    return response.data;
  } catch (error) {
    console.error("Error fetching Setting:", error);
    throw error;
  }
};
