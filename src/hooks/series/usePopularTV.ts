import { useQuery } from "react-query";
import { fetchPopularTV } from "../../services/TMDb_API_Series";

const usePopularTV = (page = "1") => {
  return useQuery({
    queryKey: ["popular-tv", page],
    queryFn: () => fetchPopularTV(page),
  });
};

export default usePopularTV;
