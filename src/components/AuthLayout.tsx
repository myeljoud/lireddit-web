import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Wrapper from "./Wrapper";

interface AuthLayoutProps {
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} | Lireddit Inc.</title>
      </Head>
      <Flex
        bg="gray.50"
        minH="100vh"
        w="100vw"
        overflowX={"hidden"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Container maxW="container.xl" centerContent>
          <Wrapper>
            <Box>
              <Heading as="h1" size="lg" mb={6}>
                {title}
              </Heading>
              {children}
            </Box>
          </Wrapper>
        </Container>
      </Flex>
    </>
  );
};

export default AuthLayout;
