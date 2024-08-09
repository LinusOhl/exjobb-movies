import { useQuery } from "react-query";
import { fetchPopularMovies } from "../../services/TMDb_API_Movies";

const usePopularMovies = (page = "1") => {
  return useQuery({
    queryKey: ["popular-movies", page],
    queryFn: () => fetchPopularMovies(page),
  });
};

export default usePopularMovies;
