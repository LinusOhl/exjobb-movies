import { useNavigate, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import usePopularMovies from "../hooks/movies/usePopularMovies";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";

const PopularMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageParam = searchParams.get("page") ?? "1";

  const { data: movies, isLoading } = usePopularMovies(pageParam);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const changePage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <Box>
      <Heading fontWeight={""} fontSize={"xx-large"} mb={6}>
        Popular Movies
      </Heading>

      <Flex
        justify={"space-around"}
        flexDirection={isMobile ? "column" : "row"}
        gap={isMobile ? 4 : ""}
        mb={12}
      >
        <Button
          variant={"outline"}
          size={"lg"}
          color={"brand.white"}
          border={"2px"}
          borderColor={"brand.red"}
          _hover={{
            color: "brand.black",
            backgroundColor: "brand.red",
          }}
          onClick={() => {
            navigate("/movies/popular?page=1");
          }}
        >
          Popular Movies
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          color={"brand.white"}
          border={"2px"}
          borderColor={"brand.yellow"}
          _hover={{
            color: "brand.black",
            backgroundColor: "brand.yellow",
          }}
          onClick={() => {
            navigate("/movies/upcoming?page=1");
          }}
        >
          Upcoming Movies
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          color={"brand.white"}
          border={"2px"}
          borderColor={"brand.blue"}
          _hover={{
            color: "brand.black",
            backgroundColor: "brand.blue",
          }}
          onClick={() => {
            navigate("/movies/top?page=1");
          }}
        >
          Top Rated Movies
        </Button>
      </Flex>

      {isLoading && <Text>Loading...</Text>}

      {movies && (
        <>
          <Wrap gap={4} mb={12}>
            {movies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Wrap>

          <Pagination
            currentPage={Number(pageParam)}
            totalPages={movies.total_pages}
            onPageChange={changePage}
          />
        </>
      )}
    </Box>
  );
};

export default PopularMoviesPage;
