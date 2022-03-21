import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Link, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home: NextPage = () => {
  const [{ fetching, error, data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <Layout pageTitle="Home page">
      <Flex justifyContent="flex-end">
        <NextLink href="/posts/create-post" passHref>
          <Button
            as="a"
            rightIcon={<AddIcon />}
            textTransform="uppercase"
            colorScheme="teal"
            variant="outline">
            Create new post
          </Button>
        </NextLink>
      </Flex>
      <Box mt={8}>
        {fetching && !data && "Loading"}
        {error && "Error ..."}
        {data?.posts &&
          data.posts.map(p => (
            <Box key={p.id}>
              <NextLink href="/" passHref>
                <Link mb={2} fontWeight="bold">
                  {p.title}
                </Link>
              </NextLink>
              <Text>{p.bodySnippet}</Text>
              <Divider my={4} />
            </Box>
          ))}
      </Box>

      <Flex mt={8} justifyContent="center">
        <Button>Load more ...</Button>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
