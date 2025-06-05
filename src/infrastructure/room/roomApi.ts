import { Room } from "../../model/room";
import apiClient from "../api/config/apiClient";

export const fetchRoomApi = async (): Promise<Room[]> => {
  try {
    const response = await apiClient.get<Room[]>("/room");

    return response.data;
  } catch (error) {
    console.error("Error fetching Rooms:", error);
    throw error;
  }
};
