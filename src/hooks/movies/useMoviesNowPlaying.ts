import { useQuery } from "react-query";
import { fetchMoviesNowPlaying } from "../../services/TMDb_API_Movies";

const useMoviesNowPlaying = () => {
  return useQuery({
    queryKey: ["movies-now-playing"],
    queryFn: fetchMoviesNowPlaying,
  });
};

export default useMoviesNowPlaying;
