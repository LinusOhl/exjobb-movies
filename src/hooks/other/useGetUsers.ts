import { usersCol } from "../../services/firebase";
import { User } from "../../types/User.types";
import useStreamCollection from "./useStreamCollection";

const useGetUsers = () => {
  return useStreamCollection<User>(usersCol);
};

export default useGetUsers;
