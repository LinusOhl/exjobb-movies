import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import useAuth from "../hooks/other/useAuth";
import { usersCol } from "../services/firebase";
import { SignUpCredentials } from "../types/User.types";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";
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

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpCredentials>();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
    setErrorMessage(null);

    try {
      setLoading(true);
      const userCredentials = await signup(data.email, data.password);
      const uid = userCredentials.user.uid;

      const docRef = doc(usersCol, uid);
      await setDoc(docRef, {
        email: data.email,
        admin: false,
        level: 1,
        exp: 0,
        reviews: 0,
        watchlists: {
          to_watch: [],
          have_watched: [],
        },
        ratings: [],
        badges: [],
      });

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <Box>
      <Heading fontWeight={""} mb={4}>
        Sign up
      </Heading>

      <form onSubmit={handleSubmit(onSignup)}>
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

        <FormControl
          id="confirmPassword"
          isInvalid={!!errors.passwordConfirm}
          mb={4}
        >
          <FormLabel>Confirm password</FormLabel>
          <Input
            type={"password"}
            autoComplete={"off"}
            {...register("passwordConfirm", {
              required: "You must enter your password again.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
              validate: (value) =>
                value === passwordRef.current ||
                "The passwords does not match.",
            })}
          />
          <FormErrorMessage>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </FormErrorMessage>
        </FormControl>

        <Button isLoading={loading} type={"submit"}>
          Sign up
        </Button>
      </form>

      <Text align={"center"}>
        Already have an account?{" "}
        <Link as={ReactRouterLink} to={"/login"}>
          Log in
        </Link>
      </Text>
    </Box>
  );
};

export default SignupPage;
