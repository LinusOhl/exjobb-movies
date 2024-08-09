import { useQuery } from "react-query";
import { fetchPersonById } from "../../services/TMDb_API_People";

const usePersonById = (personId: number) => {
  return useQuery({
    queryKey: ["person", personId],
    queryFn: () => fetchPersonById(personId),
  });
};

export default usePersonById;
