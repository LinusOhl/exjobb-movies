import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/other/useAuth";
import { Box, Text } from "@chakra-ui/react";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      await logout();
      navigate("/");
    };
    logoutUser();
  }, [logout, navigate]);

  return (
    <Box>
      <Text>Please wait while you're being logged out...</Text>
    </Box>
  );
};

export default LogoutPage;
