import { useQuery } from "react-query";
import { fetchTopRatedMovies } from "../../services/TMDb_API_Movies";

const useTopRatedMovies = (page = "1") => {
  return useQuery({
    queryKey: ["top-rated-movies", page],
    queryFn: () => fetchTopRatedMovies(page),
  });
};

export default useTopRatedMovies;
