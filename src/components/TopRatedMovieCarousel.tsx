import { Link as ReactRouterLink } from "react-router-dom";
import useTopRatedMovies from "../hooks/movies/useTopRatedMovies";
import MovieCardCarousel from "./MovieCardCarousel";
import { Heading, Link, Text } from "@chakra-ui/react";

const TopRatedMovieCarousel = () => {
  const { data: movies, isLoading } = useTopRatedMovies();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {movies && (
        <>
          <Link as={ReactRouterLink} to={"/movies/top"}>
            <Heading fontWeight={""} fontSize={"xx-large"} mb={2}>
              Top Rated Movies
            </Heading>
          </Link>
          <MovieCardCarousel movies={movies} />
        </>
      )}
    </>
  );
};

export default TopRatedMovieCarousel;
