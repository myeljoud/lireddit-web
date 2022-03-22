import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Link, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home: NextPage = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ fetching, error, data }] = usePostsQuery({ variables });

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
        {data?.posts && data.posts.posts.length > 0
          ? data.posts.posts.map((post, idx) => (
              <Box key={post.id}>
                <NextLink href="/" passHref>
                  <Link mb={2} fontWeight="bold">
                    {post.title}
                  </Link>
                </NextLink>
                <Text>{post.bodySnippet}</Text>
                {data.posts.posts.length - 1 !== idx && <Divider my={4} />}
              </Box>
            ))
          : "You have no posts for now!"}
      </Box>

      {data && data.posts.hasMore && (
        <Flex mt={8} justifyContent="center">
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            isLoading={fetching}>
            Load more ...
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
