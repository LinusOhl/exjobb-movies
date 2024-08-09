import { Link as ReactRouterLink } from "react-router-dom";
import useAuth from "../hooks/other/useAuth";
import { Show } from "../types/TMDb_API.types";
import AddToHaveWatchedButton from "./AddToHaveWatchedButton";
import AddToPlanToWatchButton from "./AddToPlanToWatchButton";
import RateButton from "./RateButton";
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react";

const ShowCard = ({ show }: { show: Show }) => {
  const { currentUser } = useAuth();
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
            show.poster_path
              ? `https://image.tmdb.org/t/p/w185${show.poster_path}`
              : "https://placehold.co/185x278"
          }
          alt={show.name}
          borderRadius={"lg"}
        />
        <Stack mt={2} spacing={3}>
          <Tooltip label={show.name}>
            <Link as={ReactRouterLink} to={`/tv-series/${show.id}`}>
              <Heading fontWeight={""} fontSize={"x-large"} noOfLines={2}>
                {show.name}
              </Heading>
            </Link>
          </Tooltip>
          <Text noOfLines={3}>{show.overview}</Text>

          {currentUser && (
            <Flex justify={"space-around"}>
              <RateButton
                mediaId={show.id}
                mediaPoster={show.poster_path}
                mediaTitle={show.name}
              />
              <AddToHaveWatchedButton
                mediaId={show.id}
                mediaPoster={show.poster_path}
                mediaTitle={show.name}
              />
              <AddToPlanToWatchButton
                mediaId={show.id}
                mediaPoster={show.poster_path}
                mediaTitle={show.name}
              />
            </Flex>
          )}
        </Stack>
      </Box>
    </WrapItem>
  );
};

export default ShowCard;
