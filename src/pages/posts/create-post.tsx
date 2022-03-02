import { Alert, AlertIcon, Box, Button, Heading, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import Layout from "../../components/Layout";
import { useCreatePostMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [notAuth, setNotAuth] = useState(false);
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout pageTitle="Create post">
      <Heading as="h1" size="lg" mb={6}>
        Create post
      </Heading>
      {notAuth && (
        <Alert status="warning" my={4}>
          <AlertIcon />
          You have to login to do this action.
          <NextLink href="/login" passHref>
            <Link fontWeight="bold" ml={2}>
              Login
            </Link>
          </NextLink>
        </Alert>
      )}
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setNotAuth(false);
          const response = await createPost({ inputs: values });

          if (response.data?.createPost.errors) {
            setErrors(toErrorMap(response.data.createPost.errors));
          } else if (response.data?.createPost.post) {
            router.push("/");
          } else if (response.error?.message.includes("Not authenticated")) {
            setNotAuth(true);
          }

          setSubmitting(false);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="title"
                placeholder="Enter post title ..."
                label="Title"
              />
            </Box>
            <Box mt={4}>
              <InputField
                textarea
                name="body"
                placeholder="Enter post body ..."
                label="Body"
                height={150}
              />
            </Box>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit">
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
