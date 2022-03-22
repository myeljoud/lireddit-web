import { Alert, AlertIcon, Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import InputField from "../../components/InputField";
import { usePasswordResetMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const PasswordReset: NextPage<{}> = () => {
  const { push, query } = useRouter();
  const token = typeof query.token === "string" ? query.token : "";

  const [tokenError, setTokenError] = useState("");
  const [, passwordReset] = usePasswordResetMutation();

  return (
    <AuthLayout title="Password Reset">
      <Formik
        initialValues={{ newPassword: "", passwordConfirmation: "" }}
        onSubmit={async (values, { setErrors }) => {
          setTokenError("");
          const response = await passwordReset({ ...values, token });
          if (response.data?.passwordReset.errors) {
            const errorsMap = toErrorMap(response.data.passwordReset.errors);
            if ("token" in errorsMap) {
              setTokenError(errorsMap.token);
            }
            setErrors(errorsMap);
          } else if (response.data?.passwordReset.user) {
            push("/");
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="newPassword"
                placeholder="Enter your new password"
                label="New Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="passwordConfirmation"
                placeholder="Re-enter password"
                label="Password Confirmation"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Alert status="error" mt={4}>
                <AlertIcon />
                {tokenError}
              </Alert>
            ) : null}
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit">
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(PasswordReset);
