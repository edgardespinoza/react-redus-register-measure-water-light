import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../model/getRoomsUseCase";
import { Room } from "../../model/room";

const useRooms = () => {
  return useQuery<Room[], Error>({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
};

export default useRooms;
