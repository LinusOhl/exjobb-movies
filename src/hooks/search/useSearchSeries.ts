import { useQuery } from "react-query";
import { fetchSearchSeries } from "../../services/TMDb_API_Search";

const useSearchSeries = (query: string, page = "1") => {
  return useQuery({
    queryKey: ["search-series", query, page],
    queryFn: () => fetchSearchSeries(query, page),
  });
};

export default useSearchSeries;
