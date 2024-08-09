import { Link as ReactRouterLink } from "react-router-dom";
import { Person } from "../types/TMDb_API.types";
import {
  Box,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react";

const PersonCard = ({ person }: { person: Person }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <WrapItem>
      <Box
        w={isMobile ? "175px" : "185px"}
        backgroundColor={"brand.dark-gray"}
        color={"brand.white"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        borderColor={"brand.gray"}
        p={2}
      >
        <Image
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
              : "https://placehold.co/185x278"
          }
          alt={person.name}
          borderRadius={"lg"}
        />
        <Stack mt={2} spacing={3}>
          <Tooltip label={person.name}>
            <Link as={ReactRouterLink} to={`/people/${person.id}`}>
              <Heading fontWeight={""} fontSize={"x-large"} noOfLines={2}>
                {person.name}
              </Heading>
            </Link>
          </Tooltip>

          <Text>{person.known_for_department}</Text>
        </Stack>
      </Box>
    </WrapItem>
  );
};

export default PersonCard;
