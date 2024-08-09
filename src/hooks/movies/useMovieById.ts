import { useQuery } from "react-query";
import { fetchMovieById } from "../../services/TMDb_API_Movies";

const useMovieById = (movieId: number) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieById(movieId),
  });
};

export default useMovieById;
