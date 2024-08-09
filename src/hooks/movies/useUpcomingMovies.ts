import { useQuery } from "react-query";
import { fetchUpcomingMovies } from "../../services/TMDb_API_Movies";

const useUpcomingMovies = (page = "1") => {
  return useQuery({
    queryKey: ["upcoming-movies", page],
    queryFn: () => fetchUpcomingMovies(page),
  });
};

export default useUpcomingMovies;
