import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import PersonCard from "../components/PersonCard";
import SearchForm from "../components/SearchForm";
import useSearchPeople from "../hooks/search/useSearchPeople";
import { Box, Heading, Text, Wrap } from "@chakra-ui/react";

const SearchPeoplePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("query") ?? "";
  const pageParam = searchParams.get("page") ?? "1";

  const { data: searchResults, isLoading } = useSearchPeople(
    queryParam,
    pageParam,
  );

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
        People
      </Heading>

      <SearchForm
        label="Search people"
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
            {searchResults.results.map((person) => (
              <PersonCard key={person.id} person={person} />
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
            <Text>Search for a person!</Text>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchPeoplePage;
