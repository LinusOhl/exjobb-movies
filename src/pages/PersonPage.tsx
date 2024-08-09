import { useParams } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import usePersonById from "../hooks/people/usePersonById";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Divider,
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

const PersonPage = () => {
  const { id } = useParams();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { data: fetchedPerson, isLoading } = usePersonById(Number(id));

  return (
    <Grid
      gap={4}
      templateRows={"repeat(2, 1fr)"}
      templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)"}
    >
      {isLoading && <Text>Loading...</Text>}

      {fetchedPerson && (
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
              <Image
                src={
                  fetchedPerson.profile_path
                    ? `https://image.tmdb.org/t/p/w342${fetchedPerson.profile_path}`
                    : "https://placehold.co/185x278"
                }
                alt={fetchedPerson.name}
              />

              <Box>
                <Heading fontWeight={""}>{fetchedPerson.name}</Heading>
                <Text>{fetchedPerson.known_for_department}</Text>
              </Box>

              <Divider my={4} />

              <Box>
                <Heading fontWeight={""} fontSize={"x-large"}>
                  Information
                </Heading>
                <Text>
                  <strong>Birthday:</strong> {fetchedPerson.birthday}
                </Text>
                <Text>
                  <strong>Place of birth:</strong>{" "}
                  {fetchedPerson.place_of_birth}
                </Text>
                <Text>
                  <strong>Deathday:</strong> {fetchedPerson.deathday || "Alive"}
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
                Biography
              </Heading>
              <Text>{fetchedPerson.biography}</Text>
            </Box>

            <Box mb={4}>
              <Heading fontWeight={""} fontSize={"x-large"}>
                Cast & Crew
              </Heading>
              <Box mb={4}>
                <Accordion defaultIndex={[0]} allowToggle>
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
                              <Th color={"brand.white"}>Poster</Th>
                              <Th color={"brand.white"}>Title</Th>
                              <Th color={"brand.white"}>Character</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {fetchedPerson.credits.cast.map((credit, index) => (
                              <Tr key={`${credit.id}-${index}`}>
                                <Td>
                                  <Avatar
                                    name={credit.title}
                                    src={
                                      credit.poster_path
                                        ? `https://image.tmdb.org/t/p/w45${credit.poster_path}`
                                        : "https://placehold.co/45x45"
                                    }
                                  />
                                </Td>
                                <Td>
                                  <Link
                                    as={ReactRouterLink}
                                    to={`/movies/${credit.id}`}
                                  >
                                    {credit.title}
                                  </Link>
                                </Td>
                                <Td>{credit.character}</Td>
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
                              <Th color={"brand.white"}>Poster</Th>
                              <Th color={"brand.white"}>Title</Th>
                              <Th color={"brand.white"}>Job</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {fetchedPerson.credits.crew.map((credit, index) => (
                              <Tr key={`${credit.id}-${index}`}>
                                <Td>
                                  <Avatar
                                    name={credit.title}
                                    src={
                                      credit.poster_path
                                        ? `https://image.tmdb.org/t/p/w45${credit.poster_path}`
                                        : "https://placehold.co/45x45"
                                    }
                                  />
                                </Td>
                                <Td>
                                  <Link
                                    as={ReactRouterLink}
                                    to={`/movies/${credit.id}`}
                                  >
                                    {credit.title}
                                  </Link>
                                </Td>
                                <Td>{credit.job}</Td>
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
        </>
      )}
    </Grid>
  );
};

export default PersonPage;
