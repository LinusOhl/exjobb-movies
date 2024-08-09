import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import useAuth from "../hooks/other/useAuth";
import { MovieListResponse } from "../types/TMDb_API.types";
import AddToHaveWatchedButton from "./AddToHaveWatchedButton";
import AddToPlanToWatchButton from "./AddToPlanToWatchButton";
import RateButton from "./RateButton";
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const MovieCardCarousel = ({ movies }: { movies: MovieListResponse }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {movies && (
        <Box mb={12}>
          <Flex gap={6} overflowX={"scroll"}>
            <HStack>
              {movies.results.slice(0, 20).map((movie) => (
                <Box key={movie.id} w={"200px"} h={"400px"}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    objectFit={"fill"}
                    width={"100%"}
                    height={"260px"}
                    _hover={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/movies/${movie.id}`);
                    }}
                  />
                  <Box p={2}>
                    <Tooltip label={movie.title}>
                      <Link as={ReactRouterLink} to={`/movies/${movie.id}`}>
                        <Text noOfLines={2} minH={"50px"} mb={2}>
                          {movie.title}
                        </Text>
                      </Link>
                    </Tooltip>

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
                  </Box>
                </Box>
              ))}
            </HStack>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default MovieCardCarousel;
