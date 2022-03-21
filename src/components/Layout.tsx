import { Box, Container, VStack } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import NavBar from "./NavBar";

interface LayoutProps {
  pageTitle: string;
  pageDescription?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  pageDescription,
}) => {
  return (
    <Box pb={10}>
      <Head>
        <title>{pageTitle} | Lireddit Inc.</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack spacing={10}>
        <NavBar />
        <Container maxW="container.xl">
          <Box as="main">{children}</Box>
        </Container>
      </VStack>
    </Box>
  );
};

export default Layout;
