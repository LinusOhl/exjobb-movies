import { Link as ReactRouterLink } from "react-router-dom";
import useAuth from "../hooks/other/useAuth";
import { Movie } from "../types/TMDb_API.types";
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

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { currentUser } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <WrapItem key={movie.id}>
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
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
              : "https://placehold.co/185x278"
          }
          alt={movie.title}
          borderRadius={"lg"}
        />
        <Stack mt={2} spacing={3}>
          <Tooltip label={movie.title}>
            <Link as={ReactRouterLink} to={`/movies/${movie.id}`}>
              <Heading fontWeight={""} fontSize={"x-large"} noOfLines={2}>
                {movie.title}
              </Heading>
            </Link>
          </Tooltip>
          <Text noOfLines={3}>{movie.overview}</Text>

          {currentUser && (
            <Flex justify={"space-around"}>
              <RateButton
                mediaId={movie.id}
                mediaPoster={movie.poster_path}
                mediaTitle={movie.title}
              />
              <AddToHaveWatchedButton
                mediaId={movie.id}
                mediaPoster={movie.poster_path}
                mediaTitle={movie.title}
              />
              <AddToPlanToWatchButton
                mediaId={movie.id}
                mediaPoster={movie.poster_path}
                mediaTitle={movie.title}
              />
            </Flex>
          )}
        </Stack>
      </Box>
    </WrapItem>
  );
};

export default MovieCard;
