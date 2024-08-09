import { Link as ReactRouterLink } from "react-router-dom";
import useUpcomingMovies from "../hooks/movies/useUpcomingMovies";
import MovieCardCarousel from "./MovieCardCarousel";
import { Heading, Link, Text } from "@chakra-ui/react";

const UpcomingMoviesCarousel = () => {
  const { data: movies, isLoading } = useUpcomingMovies();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {movies && (
        <>
          <Link as={ReactRouterLink} to={"/movies/upcoming"}>
            <Heading fontWeight={""} fontSize={"xx-large"} mb={2}>
              Upcoming Movies
            </Heading>
          </Link>
          <MovieCardCarousel movies={movies} />
        </>
      )}
    </>
  );
};

export default UpcomingMoviesCarousel;
