import { useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import AddToHaveWatchedButton from "../components/AddToHaveWatchedButton";
import AddToPlanToWatchButton from "../components/AddToPlanToWatchButton";
import MediaReviews from "../components/MediaReviews";
import RateButton from "../components/RateButton";
import useAuth from "../hooks/other/useAuth";
import useTVSeriesById from "../hooks/series/useTVSeriesById";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

const SeriesPage = () => {
  const { currentUser, userProfile } = useAuth();
  const { id } = useParams();

  const foundSeries = userProfile?.ratings.find(
    (series) => series.movieId === Number(id),
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { data: series, isLoading } = useTVSeriesById(Number(id));

  return (
    <Grid
      gap={4}
      templateRows={"repeat(2, 1fr)"}
      templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)"}
    >
      {isLoading && <Text>Loading...</Text>}

      {series && (
        <>
          <GridItem
            colSpan={2}
            backgroundColor={"brand.dark-gray"}
            p={4}
            borderRadius={"lg"}
            borderWidth={"1px"}
            borderColor={"brand.gray"}
          >
            <Stack>
              {currentUser && (
                <Flex justify={"space-around"}>
                  <RateButton
                    mediaId={series.id}
                    mediaPoster={series.poster_path}
                    mediaTitle={series.name}
                  />
                  <AddToHaveWatchedButton
                    mediaId={series.id}
                    mediaPoster={series.poster_path}
                    mediaTitle={series.name}
                  />
                  <AddToPlanToWatchButton
                    mediaId={series.id}
                    mediaPoster={series.poster_path}
                    mediaTitle={series.name}
                  />
                </Flex>
              )}
              <Image
                src={
                  series.poster_path
                    ? `https://image.tmdb.org/t/p/w342${series.poster_path}`
                    : "https://placehold.co/185x278"
                }
                alt={series.name}
              />

              {foundSeries && <Text>Your rating: {foundSeries.rating}</Text>}

              <Divider my={4} />

              <Box>
                <Heading fontWeight={""}>{series.name}</Heading>
                <Text>{series.tagline}</Text>
              </Box>

              <Stack direction={"row"}>
                {series.genres.map((genre) => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </Stack>

              <Divider my={4} />

              <Box>
                <Heading fontWeight={""} fontSize={"x-large"}>
                  Information
                </Heading>
                <Text>
                  <strong>Seasons:</strong> {series.number_of_seasons}
                </Text>
                <Text>
                  <strong>Episodes:</strong> {series.number_of_episodes}
                </Text>
                <Text>
                  <strong>First air date:</strong> {series.first_air_date}
                </Text>
              </Box>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={3}
            backgroundColor={"brand.dark-gray"}
            p={4}
            borderRadius={"lg"}
            borderWidth={"1px"}
            borderColor={"brand.gray"}
          >
            <Box mb={4}>
              <Heading fontWeight={""} fontSize={"x-large"}>
                Synopsis
              </Heading>
              <Text>{series.overview}</Text>
            </Box>

            <Box mb={4}>
              <Heading fontWeight={""} fontSize={"x-large"}>
                Cast & Crew
              </Heading>
              <Box mb={4}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex={1} textAlign={"left"}>
                          Cast
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <TableContainer>
                        <Table variant={"simple"}>
                          <Thead>
                            <Tr>
                              <Th color={"brand.white"}>Profile</Th>
                              <Th color={"brand.white"}>Name</Th>
                              <Th color={"brand.white"}>Character</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {series.credits.cast.map((person, index) => (
                              <Tr key={`${person.id}-${index}`}>
                                <Td>
                                  <Avatar
                                    name={person.name}
                                    src={
                                      person.profile_path
                                        ? `https://image.tmdb.org/t/p/w45${person.profile_path}`
                                        : "https://placehold.co/45x45"
                                    }
                                  />
                                </Td>
                                <Td>
                                  <Link
                                    as={ReactRouterLink}
                                    to={`/people/${person.id}`}
                                  >
                                    {person.name}
                                  </Link>
                                </Td>
                                <Td>{person.character}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex={1} textAlign={"left"}>
                          Crew
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <TableContainer>
                        <Table variant={"simple"}>
                          <Thead>
                            <Tr>
                              <Th color={"brand.white"}>Profile</Th>
                              <Th color={"brand.white"}>Name</Th>
                              <Th color={"brand.white"}>Job</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {series.credits.crew.map((person, index) => (
                              <Tr key={`${person.id}-${index}`}>
                                <Td>
                                  <Avatar
                                    name={person.name}
                                    src={
                                      person.profile_path
                                        ? `https://image.tmdb.org/t/p/w45${person.profile_path}`
                                        : "https://placehold.co/45x45"
                                    }
                                  />
                                </Td>
                                <Td>
                                  <Link
                                    as={ReactRouterLink}
                                    to={`/people/${person.id}`}
                                  >
                                    {person.name}
                                  </Link>
                                </Td>
                                <Td>{person.job}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          </GridItem>

          {currentUser && (
            <GridItem colSpan={5}>
              <MediaReviews mediaId={series.id} />
            </GridItem>
          )}
        </>
      )}
    </Grid>
  );
};

export default SeriesPage;
