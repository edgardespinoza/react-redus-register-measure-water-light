import { fetchSettingApi } from "../infraestructure/setting/settingGetApi";
import { Setting } from "./setting";

export const getSetting = async (): Promise<Setting> => {
  return await fetchSettingApi();
};
