import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useRouter } from "next/router";
interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [{ data }, forgotPassword] = useForgotPasswordMutation();

  useEffect(() => {
    if (!completed) return;

    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [completed, router]);

  return (
    <AuthLayout title="Forgot Password">
      {completed ? (
        <Alert
          status="success"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={10}
          rounded="lg">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Request submitted!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            If an account with that email address exists, we have sent it a
            password reset email.
          </AlertDescription>
        </Alert>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async values => {
            const response = await forgotPassword(values);

            if (response.data?.forgotPassword) {
              setCompleted(true);
            }
          }}>
          {({ isSubmitting }) => (
            <Form>
              <Box>
                <InputField
                  name="email"
                  placeholder="Enter your email"
                  label="Email"
                />
              </Box>
              {data?.forgotPassword === false ? (
                <Alert status="warning" mt={4}>
                  <AlertIcon />
                  Please enter a valid email address
                </Alert>
              ) : null}
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit">
                Request a new password
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
