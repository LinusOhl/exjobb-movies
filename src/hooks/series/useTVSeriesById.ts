import { useQuery } from "react-query";
import { fetchTVSeriesById } from "../../services/TMDb_API_Series";

const useTVSeriesById = (seriesId: number) => {
  return useQuery({
    queryKey: ["series", seriesId],
    queryFn: () => fetchTVSeriesById(seriesId),
  });
};

export default useTVSeriesById;
