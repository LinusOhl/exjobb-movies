import { useQuery } from "react-query";
import {
  fetchMovieById,
  fetchUpcomingMovies,
} from "../../services/TMDb_API_Movies";

const useUpcomingMoviesWithTrailers = () => {
  return useQuery({
    queryKey: ["upcoming-movies-trailers"],
    queryFn: async () => {
      const movies = await fetchUpcomingMovies();

      if (!movies) return;

      const moviesWithTrailers = await Promise.all(
        movies.results.slice(0, 20).map(async (movie) => {
          const movieWithTrailer = await fetchMovieById(movie.id);
          return movieWithTrailer;
        }),
      );

      return moviesWithTrailers;
    },
  });
};

export default useUpcomingMoviesWithTrailers;
