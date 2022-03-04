import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const { push, query } = useRouter();
  const [, login] = useLoginMutation();

  return (
    <AuthLayout title="Login">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const response = await login(values);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            typeof query.next === "string" ? push(query.next) : push("/");
          }

          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="usernameOrEmail"
                placeholder="Enter your username or email"
                label="Username or email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Enter your password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={4} justifyContent="space-between" alignItems="center">
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Login
              </Button>
              <NextLink href="/forgot-password" passHref>
                <Link textAlign="right" ml={2}>
                  Forgot password?
                </Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
