import { useEffect, useState } from "react";
import { MdCookie } from "react-icons/md";
import useAuth from "../hooks/other/useAuth";
import { db } from "../services/firebase";
import { User } from "../types/User.types";
import { doc, getDoc } from "firebase/firestore";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListItem,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUserProfile(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  return (
    <Box>
      <Heading fontWeight={""} mb={4}>
        Profile
      </Heading>

      {currentUser && userProfile && (
        <Flex
          flexDirection={"column"}
          backgroundColor={"brand.dark-gray"}
          borderRadius={"lg"}
          borderWidth={"1px"}
          borderColor={"brand.gray"}
          p={4}
          mb={4}
        >
          <Heading fontWeight={""} fontSize={"x-large"} mb={4}>
            {userProfile.email}
          </Heading>

          <Flex flexDirection={"column"} gap={2} mb={12}>
            <Box width={"100%"}>
              <Text>Experience</Text>
              <Progress value={userProfile.exp * 2} />
            </Box>
            <Box>
              <Stat>
                <StatLabel>Level</StatLabel>
                <StatNumber>{userProfile.level}</StatNumber>
              </Stat>
            </Box>
          </Flex>

          <Flex flexDirection={"column"} mb={12}>
            <Heading fontWeight={""} fontSize={"x-large"} mb={4}>
              Earned Badges
            </Heading>

            <Flex gap={4}>
              {userProfile.badges.map((badge) => (
                <Box
                  boxSize={"fit-content"}
                  textAlign={"center"}
                  key={badge}
                  backgroundColor={"brand.gray"}
                  borderRadius={"lg"}
                  borderWidth={"1px"}
                  borderColor={"brand.gray"}
                  p={4}
                >
                  <Icon boxSize={12} as={MdCookie} />
                  <Text>{badge}</Text>
                </Box>
              ))}
            </Flex>
          </Flex>

          <Box>
            <Heading fontWeight={""} fontSize={"x-large"} mb={4}>
              Watchlists
            </Heading>
            <Flex
              flexDirection={isMobile ? "column" : "row"}
              justify={"space-around"}
            >
              <Box>
                <Heading fontWeight={""} fontSize={"large"} mb={4}>
                  Plan to Watch:
                </Heading>

                <List mb={12}>
                  {userProfile.watchlists.to_watch.map((media) => (
                    <ListItem key={media.movieId} mb={4}>
                      <Image
                        src={
                          media.moviePoster
                            ? `https://image.tmdb.org/t/p/w92${media.moviePoster}`
                            : "https://placehold.co/185x278"
                        }
                      />
                      <Text>{media.movieTitle}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Heading fontWeight={""} fontSize={"large"} mb={4}>
                  Watched:
                </Heading>

                <List mb={12}>
                  {userProfile.watchlists.have_watched.map((media) => (
                    <ListItem key={media.movieId} mb={4}>
                      <Image
                        src={
                          media.moviePoster
                            ? `https://image.tmdb.org/t/p/w92${media.moviePoster}`
                            : "https://placehold.co/185x278"
                        }
                      />
                      <Text>{media.movieTitle}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ProfilePage;
