import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import ShowCard from "../components/ShowCard";
import useTopTV from "../hooks/series/useTopTV";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";

const TopSeriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageParam = searchParams.get("page") ?? "1";

  const { data: shows, isLoading } = useTopTV(pageParam);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const changePage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <Box>
      <Heading fontWeight={""} fontSize={"xx-large"} mb={6}>
        Popular TV Series
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
            navigate("/tv-series/popular?page=1");
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
            navigate("/tv-series/airing?page=1");
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
            navigate("/tv-series/top?page=1");
          }}
        >
          Top TV Series
        </Button>
      </Flex>

      {isLoading && <Text>Loading...</Text>}

      {shows && (
        <>
          <Wrap gap={4} mb={12}>
            {shows.results.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </Wrap>

          <Pagination
            currentPage={Number(pageParam)}
            totalPages={shows.total_pages}
            onPageChange={changePage}
          />
        </>
      )}
    </Box>
  );
};

export default TopSeriesPage;
