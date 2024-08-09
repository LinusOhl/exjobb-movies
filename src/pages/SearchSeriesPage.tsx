import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import ShowCard from "../components/ShowCard";
import useSearchSeries from "../hooks/search/useSearchSeries";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";

const SearchSeriesPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("query") ?? "";
  const pageParam = searchParams.get("page") ?? "1";

  const { data: searchResults, isLoading } = useSearchSeries(
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
        TV Series
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
            navigate("/tv-series/popular");
          }}
        >
          Popular TV Series
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
            navigate("/tv-series/airing");
          }}
        >
          Airing TV Series
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
            navigate("/tv-series/top");
          }}
        >
          Top TV Series
        </Button>
      </Flex>

      <SearchForm
        label="Search TV series"
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
            {searchResults.results.map((show) => (
              <ShowCard key={show.id} show={show} />
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
            <Text>Search for a TV Show!</Text>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchSeriesPage;
