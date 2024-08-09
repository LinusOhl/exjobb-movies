import { useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import AddToHaveWatchedButton from "../components/AddToHaveWatchedButton";
import AddToPlanToWatchButton from "../components/AddToPlanToWatchButton";
import MediaReviews from "../components/MediaReviews";
import RateButton from "../components/RateButton";
import useMovieById from "../hooks/movies/useMovieById";
import useAuth from "../hooks/other/useAuth";
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

const MoviePage = () => {
  const { currentUser, userProfile } = useAuth();
  const { id } = useParams();

  const foundMovie = userProfile?.ratings.find(
    (movie) => movie.movieId === Number(id),
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { data: movie, isLoading } = useMovieById(Number(id));

  return (
    <>
      <Grid
        gap={4}
        templateRows={"repeat(2, 1fr)"}
        templateColumns={isMobile ? "repeat(5, 1fr)" : "repeat(5, 1fr)"}
      >
        {isLoading && <Text>Loading...</Text>}

        {movie && (
          <>
            <GridItem
              colSpan={isMobile ? 5 : 2}
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
                      mediaId={movie.id}
                      mediaPoster={movie.poster_path}
                      mediaTitle={movie.title}
                    />
                    <AddToHaveWatchedButton
                      mediaId={movie.id}
                      mediaPoster={movie.poster_path}
                      mediaTitle={movie.title}
                    />
                    <AddToPlanToWatchButton
                      mediaId={movie.id}
                      mediaPoster={movie.poster_path}
                      mediaTitle={movie.title}
                    />
                  </Flex>
                )}
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : "https://placehold.co/185x278"
                  }
                  alt={movie.title}
                />

                {foundMovie && <Text>Your rating: {foundMovie.rating}</Text>}

                <Divider my={4} />

                <Box>
                  <Heading fontWeight={""}>{movie.title}</Heading>
                  <Text>{movie.tagline}</Text>
                </Box>

                <Stack direction={"row"}>
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id}>{genre.name}</Badge>
                  ))}
                </Stack>

                <Divider my={4} />

                <Box>
                  <Heading fontWeight={""} fontSize={"x-large"}>
                    Information
                  </Heading>
                  <Text>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </Text>
                  <Text>
                    <strong>Release date:</strong> {movie.release_date}
                  </Text>
                  <Text>
                    <strong>Budget:</strong>{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(movie.budget)}
                  </Text>
                  <Text>
                    <strong>Revenue:</strong>{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(movie.revenue)}
                  </Text>
                </Box>
              </Stack>
            </GridItem>
            <GridItem
              colSpan={isMobile ? 5 : 3}
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
                <Text>{movie.overview}</Text>
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
                              {movie.credits.cast.map((person, index) => (
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
                              {movie.credits.crew.map((person, index) => (
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
                <MediaReviews mediaId={movie.id} />
              </GridItem>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default MoviePage;
