import { useQuery } from "react-query";
import { fetchTVOnTheAir } from "../../services/TMDb_API_Series";

const useTVOnTheAir = (page = "1") => {
  return useQuery({
    queryKey: ["tv-on-the-air", page],
    queryFn: () => fetchTVOnTheAir(page),
  });
};

export default useTVOnTheAir;
