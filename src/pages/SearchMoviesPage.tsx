import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import useSearchMovies from "../hooks/search/useSearchMovies";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";

const SearchMoviesPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("query") ?? "";
  const pageParam = searchParams.get("page") ?? "1";

  const { data: searchResults, isLoading } = useSearchMovies(
    queryParam,
    pageParam,
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }

    setSearchParams({ query: searchInput, page: "1" });
  };

  const changePage = (newPage: number) => {
    setSearchParams({ query: queryParam, page: String(newPage) });
  };

  return (
    <Box>
      <Heading fontWeight={""} fontSize={"xx-large"} mb={6}>
        Movies
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

      <SearchForm
        label="Search movies"
        searchQuery={searchInput}
        onSearchChange={(e) => setSearchInput(e.target.value)}
        onSearchSubmit={handleSubmit}
      />

      {isLoading && <Text>Loading...</Text>}

      {searchResults && searchResults.results.length > 0 ? (
        <>
          {searchResults.results && (
            <Text mb={4}>Found {searchResults.total_results} results...</Text>
          )}
          <Wrap gap={4} mb={12}>
            {searchResults.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Wrap>

          <Pagination
            currentPage={Number(pageParam)}
            totalPages={searchResults.total_pages}
            onPageChange={changePage}
          />
        </>
      ) : (
        <>
          {queryParam ? (
            <Text>No results found.</Text>
          ) : (
            <Text>Search for a Movie!</Text>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchMoviesPage;
