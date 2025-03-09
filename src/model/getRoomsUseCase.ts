import { fetchRoomApi } from "../infraestructure/room/roomApi";
import { Room } from "./room";

export const getRooms = async (): Promise<Room[]> => {
  return await fetchRoomApi();
};
