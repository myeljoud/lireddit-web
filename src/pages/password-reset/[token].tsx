import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import AuthLayout from "../../components/AuthLayout";
import InputField from "../../components/InputField";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

const PasswordReset: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <AuthLayout title="Password Reset">
      <Formik
        initialValues={{ newPassword: "", passwordConfirmation: "" }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          // const response = await login(values);
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors));
          // } else if (response.data?.login.user) {
          //   router.push("/");
          // }
          // setSubmitting(false);
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

PasswordReset.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default PasswordReset;
