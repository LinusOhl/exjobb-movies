import { MdMenu } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/other/useAuth";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

const Navigation = () => {
  const { currentUser, userEmail } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            position={"fixed"}
            aria-label="Open menu"
            icon={<MdMenu />}
            onClick={onOpen}
            zIndex={2}
            right={"1em"}
            bottom={"1em"}
            fontSize={"x-large"}
            isRound
            size={"lg"}
            backgroundColor={"brand.white"}
            color={"brand.black"}
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent
                backgroundColor={"brand.dark-gray"}
                p={4}
                justifyContent={"space-between"}
              >
                <Box>
                  <Box mb={4}>
                    <Heading color={"brand.white"}>
                      <Link as={NavLink} to={"/"} onClick={onClose}>
                        mobase
                      </Link>
                    </Heading>

                    {userEmail && <Text>Logged in as {userEmail}</Text>}
                  </Box>

                  <List>
                    <ListItem mb={2}>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/movies?query=&page=1"}
                        w={"100%"}
                        justifyContent={"space-between"}
                        fontSize={"x-large"}
                        rightIcon={<MdArrowForwardIos />}
                        color={"brand.black"}
                        backgroundColor={"brand.white"}
                      >
                        Movies
                      </Button>
                    </ListItem>
                    <ListItem mb={2}>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/tv-series?query=&page=1"}
                        w={"100%"}
                        justifyContent={"space-between"}
                        fontSize={"x-large"}
                        rightIcon={<MdArrowForwardIos />}
                        color={"brand.black"}
                        backgroundColor={"brand.white"}
                      >
                        TV Series
                      </Button>
                    </ListItem>
                    <ListItem mb={2}>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/people?query=&page=1"}
                        w={"100%"}
                        justifyContent={"space-between"}
                        fontSize={"x-large"}
                        rightIcon={<MdArrowForwardIos />}
                        color={"brand.black"}
                        backgroundColor={"brand.white"}
                      >
                        People
                      </Button>
                    </ListItem>
                    <ListItem mb={2}>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/leaderboards"}
                        w={"100%"}
                        justifyContent={"space-between"}
                        fontSize={"x-large"}
                        rightIcon={<MdArrowForwardIos />}
                        color={"brand.black"}
                        backgroundColor={"brand.white"}
                      >
                        Leaderboard
                      </Button>
                    </ListItem>
                  </List>
                </Box>

                <Flex flexDirection={"row"} justify={"space-evenly"} gap={2}>
                  {currentUser ? (
                    <>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/logout"}
                        w={"100%"}
                        fontSize={"x-large"}
                        variant={"outline"}
                        color={"brand.white"}
                        _hover={{
                          backgroundColor: "brand.white",
                          color: "brand.black",
                        }}
                      >
                        Log out
                      </Button>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/profile"}
                        w={"100%"}
                        fontSize={"x-large"}
                        color={"brand.black"}
                        backgroundColor={"brand.white"}
                      >
                        Profile
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/login"}
                        w={"100%"}
                        fontSize={"x-large"}
                        variant={"outline"}
                        color={"brand.white"}
                        _hover={{
                          backgroundColor: "brand.white",
                          color: "brand.black",
                        }}
                      >
                        Log in
                      </Button>
                      <Button
                        onClick={onClose}
                        as={NavLink}
                        to={"/signup"}
                        w={"100%"}
                        fontSize={"x-large"}
                        color={"brand.black"}
                        backgroundColor={"brand.white"}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </Flex>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        <Flex
          as="nav"
          align={"center"}
          justify={"space-between"}
          p={4}
          boxShadow={"md"}
          mb={12}
        >
          <Box>
            <Heading color={"brand.white"}>
              <Link as={NavLink} to={"/"}>
                mobase
              </Link>
            </Heading>

            {userEmail && <Text>Logged in as {userEmail}</Text>}
          </Box>

          <Flex gap={10}>
            <Link
              as={NavLink}
              to={"/movies?query=&page=1"}
              fontSize={"large"}
              color={"brand.white"}
            >
              Movies
            </Link>
            <Link
              as={NavLink}
              to={"/tv-series"}
              fontSize={"large"}
              color={"brand.white"}
            >
              TV Series
            </Link>
            <Link
              as={NavLink}
              to={"/people"}
              fontSize={"large"}
              color={"brand.white"}
            >
              People
            </Link>
            <Link
              as={NavLink}
              to={"/leaderboards"}
              fontSize={"large"}
              color={"brand.white"}
            >
              Leaderboard
            </Link>
          </Flex>

          <Flex gap={2}>
            {currentUser ? (
              <>
                <Button
                  as={NavLink}
                  to={"/logout"}
                  fontSize={"large"}
                  variant={"outline"}
                  color={"brand.white"}
                  _hover={{
                    backgroundColor: "brand.white",
                    color: "brand.black",
                  }}
                >
                  Log out
                </Button>
                <Button
                  as={NavLink}
                  to={"/profile"}
                  fontSize={"large"}
                  color={"brand.black"}
                  backgroundColor={"brand.white"}
                >
                  Profile
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={NavLink}
                  to={"/login"}
                  fontSize={"large"}
                  variant={"outline"}
                  color={"brand.white"}
                  _hover={{
                    backgroundColor: "brand.white",
                    color: "brand.black",
                  }}
                >
                  Log in
                </Button>
                <Button
                  as={NavLink}
                  to={"/signup"}
                  fontSize={"large"}
                  color={"brand.black"}
                  backgroundColor={"brand.white"}
                >
                  Sign up
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Navigation;
