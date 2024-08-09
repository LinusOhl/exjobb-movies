import { useQuery } from "react-query";
import { fetchTVAiringToday } from "../../services/TMDb_API_Series";

const useTVAiringToday = () => {
  return useQuery({
    queryKey: ["tv-airing-today"],
    queryFn: fetchTVAiringToday,
  });
};

export default useTVAiringToday;
