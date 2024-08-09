import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import useAuth from "../hooks/other/useAuth";
import { LoginCredentials } from "../types/User.types";
import { FirebaseError } from "firebase/app";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
    setErrorMessage(null);

    try {
      setLoading(true);
      await login(data.email, data.password);

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Box>
      <Heading fontWeight={""} mb={4}>
        Log in
      </Heading>

      <form onSubmit={handleSubmit(onLogin)}>
        {errorMessage && (
          <Alert status={"error"} color={"brand.black"}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <FormControl id="email" isInvalid={!!errors.email} mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type={"email"}
            placeholder="john.doe@gmail.com"
            {...register("email", {
              required: "You have to enter an email address.",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="password" isInvalid={!!errors.password} mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type={"password"}
            autoComplete={"new-password"}
            {...register("password", {
              required: "You must enter a good password.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button isLoading={loading} type={"submit"}>
          Log in
        </Button>
      </form>

      <Text align={"center"}>
        Need an account?{" "}
        <Link as={ReactRouterLink} to={"/signup"}>
          Sign up
        </Link>
      </Text>
    </Box>
  );
};

export default LoginPage;
