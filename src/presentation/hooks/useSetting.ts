import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../model/getSettingUseCase";

const useSetting = () => {
  return useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });
};

export default useSetting;
