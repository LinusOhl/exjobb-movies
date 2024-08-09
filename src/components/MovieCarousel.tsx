import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import useUpcomingMoviesWithTrailers from "../hooks/movies/useUpcomingMoviesWithTrailers";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const MovieCarousel = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: moviesWithTrailers, isLoading } =
    useUpcomingMoviesWithTrailers();

  const nextSlide = () => {
    if (!moviesWithTrailers) return;
    setCurrent(current === moviesWithTrailers.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (!moviesWithTrailers) return;
    setCurrent(current === 0 ? moviesWithTrailers.length - 1 : current - 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {moviesWithTrailers && (
        <Flex align={"center"} justify={"center"} boxShadow={"md"} mb={10}>
          <Box position={"relative"}>
            <IconButton
              aria-label="Previous slide"
              icon={<MdArrowBackIos />}
              position={"absolute"}
              left={".6em"}
              top={"50%"}
              transform={"translateY(-50%)"}
              onClick={prevSlide}
              background={"none"}
              color={"brand.white"}
              _hover={{
                background: "brand.white",
                color: "brand.black",
              }}
            />
            <IconButton
              aria-label="Next slide"
              icon={<MdArrowForwardIos />}
              position={"absolute"}
              right={".6em"}
              top={"50%"}
              transform={"translateY(-50%)"}
              onClick={nextSlide}
              background={"none"}
              color={"brand.white"}
              _hover={{
                background: "brand.white",
                color: "brand.black",
              }}
            />
            {moviesWithTrailers.map((movie, index) => (
              <Box
                key={movie?.id}
                display={index === current ? "block" : "none"}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
                  alt={movie?.title}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`/movies/${movie?.id}`);
                  }}
                />
                <Flex
                  position={"absolute"}
                  bottom={0}
                  left={0}
                  right={0}
                  bg={"linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"}
                  p={4}
                  justify={"center"}
                  align={"center"}
                >
                  <Box textAlign={"start"}>
                    <Link as={ReactRouterLink} to={`/movies/${movie?.id}`}>
                      <Heading
                        fontSize={isMobile ? "medium" : "xx-large"}
                        fontWeight={""}
                        color={"brand.white"}
                      >
                        {movie?.title}
                      </Heading>
                    </Link>
                    {!isMobile && (
                      <Text
                        fontSize={"medium"}
                        color={"brand.white"}
                        noOfLines={2}
                      >
                        {movie?.overview}
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        </Flex>
      )}
    </>
  );
};

export default MovieCarousel;
