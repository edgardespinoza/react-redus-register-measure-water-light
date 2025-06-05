import { fetchRoomApi } from "../infrastructure/room/roomApi";
import { Room } from "./room";

export const getRooms = async (): Promise<Room[]> => {
  return await fetchRoomApi();
};
