import { Box, Divider, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { Post, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

type stateType = Post[] | string | null;

const Home: NextPage = () => {
  const [{ fetching, error, data }] = usePostsQuery();

  let state: stateType = null;

  if (fetching) {
    state = "Loading ...";
  } else if (data?.posts) {
    state = data.posts;
  } else if (error) {
    state = "Error ...";
  }

  return (
    <Layout pageTitle="Home page">
      {!Array.isArray(state)
        ? state
        : state.map(p => (
            <Box key={p.id}>
              <Text mb={2} fontWeight="bold">
                {p.title}
              </Text>
              <Text>{p.body}</Text>
              <Divider my={4} />
            </Box>
          ))}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
