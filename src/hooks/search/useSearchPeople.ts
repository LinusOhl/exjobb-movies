import { useQuery } from "react-query";
import { fetchSearchPeople } from "../../services/TMDb_API_Search";

const useSearchPeople = (query: string, page = "1") => {
  return useQuery({
    queryKey: ["search-people", query, page],
    queryFn: () => fetchSearchPeople(query, page),
  });
};

export default useSearchPeople;
