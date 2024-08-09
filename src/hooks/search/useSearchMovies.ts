import { useQuery } from "react-query";
import { fetchSearchMovies } from "../../services/TMDb_API_Search";

const useSearchMovies = (query: string, page = "1") => {
  return useQuery({
    queryKey: ["search-movies", query, page],
    queryFn: () => fetchSearchMovies(query, page),
  });
};

export default useSearchMovies;
