import { useQuery } from "react-query";
import { fetchTopTV } from "../../services/TMDb_API_Series";

const useTopTV = (page = "1") => {
  return useQuery({
    queryKey: ["top-tv", page],
    queryFn: () => fetchTopTV(page),
  });
};

export default useTopTV;
