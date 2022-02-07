import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper>
      <Box>
        <Heading as="h1" size="lg" mb={8}>
          Register
        </Heading>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values);
            console.log("response: ", response);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            }
          }}>
          {({ isSubmitting }) => (
            <Form>
              <Box>
                <InputField
                  name="username"
                  placeholder="Enter your username"
                  label="Username"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="Enter your email"
                  label="Email"
                  type="email"
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
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Register;
