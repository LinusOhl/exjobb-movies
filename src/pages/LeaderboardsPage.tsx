import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { User } from "../types/User.types";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const LeaderboardsPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersColRef = collection(db, "users");
        const snapshot = await getDocs(usersColRef);
        const usersList = snapshot.docs.map((doc) => doc.data() as User);

        usersList.sort((a, b) => {
          if (a.level > b.level) return -1;
          if (a.level < b.level) return 1;
          if (a.exp > b.exp) return -1;
          if (a.exp < b.exp) return 1;
          return 0;
        });

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching all users", error);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <Box>
      <Heading fontWeight={""}>Leaderboards</Heading>

      <Text mb={12}>
        Rating & reviewing a movie or series gives you experience points. After
        every 50 experience points earned you level up.
      </Text>

      {users && (
        <TableContainer>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th color={"brand.white"}>User</Th>
                <Th color={"brand.white"}>Experience</Th>
                <Th color={"brand.white"}>Level</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={index}>
                  <Td>{user.email}</Td>
                  <Td>{user.exp}</Td>
                  <Td>{user.level}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LeaderboardsPage;
