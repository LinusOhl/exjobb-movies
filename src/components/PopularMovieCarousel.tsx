import { Link as ReactRouterLink } from "react-router-dom";
import usePopularMovies from "../hooks/movies/usePopularMovies";
import MovieCardCarousel from "./MovieCardCarousel";
import { Heading, Link, Text } from "@chakra-ui/react";

const PopularMovieCarousel = () => {
  const { data: movies, isLoading } = usePopularMovies();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {movies && (
        <>
          <Link as={ReactRouterLink} to={"/movies/popular"}>
            <Heading fontWeight={""} fontSize={"xx-large"} mb={2}>
              Popular Movies
            </Heading>
          </Link>
          <MovieCardCarousel movies={movies} />
        </>
      )}
    </>
  );
};

export default PopularMovieCarousel;
