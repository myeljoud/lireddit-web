import { Box, Container, HStack, Link, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

const Home: NextPage = () => {
  const [{ fetching, error, data }] = useMeQuery();
  return (
    <div>
      <Head>
        <title>Home page | Lireddit Inc.</title>
        <meta name="description" content="Lireddit Inc." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack spacing={10}>
        <Box as="nav" px={2} py={4} bg="teal.100" w="100%">
          <Container maxW="container.xl">
            <HStack spacing={6} justifyContent="flex-end">
              {error && <Text color="red.500">Error ...</Text>}

              {fetching && <Text>Loading ...</Text>}

              {data?.me ? (
                <Text>
                  {data.me.username} | {data.me.email}
                </Text>
              ) : (
                <>
                  <Link>
                    <NextLink href="/login">Login</NextLink>
                  </Link>
                  <Link>
                    <NextLink href="/register">Register</NextLink>
                  </Link>
                </>
              )}
            </HStack>
          </Container>
        </Box>
        <Container maxW="container.xl">
          <Box as="main">Hello</Box>
        </Container>
      </VStack>
    </div>
  );
};

export default Home;
