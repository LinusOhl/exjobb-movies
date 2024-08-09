import { useQuery } from "react-query";
import { fetchPopularPeople } from "../../services/TMDb_API_People";

const usePopularPeople = () => {
  return useQuery({
    queryKey: ["popular-people"],
    queryFn: fetchPopularPeople,
  });
};

export default usePopularPeople;
