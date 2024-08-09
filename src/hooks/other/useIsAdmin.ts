import { useEffect, useState } from "react";
import useGetUsers from "./useGetUsers";

const useIsAdmin = (userEmail: string | null) => {
  const { data: users } = useGetUsers();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (users && userEmail) {
      const userIsAdmin = users.find((user) => user.email === userEmail);
      if (userIsAdmin) {
        setIsAdmin(userIsAdmin.admin);
      }
    }
  }, [users, userEmail]);

  return isAdmin;
};

export default useIsAdmin;
