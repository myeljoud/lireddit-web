import { Box, Container, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Box as="nav" px={2} py={4} bg="teal.100" w="100%">
      <Container maxW="container.xl">
        <HStack spacing={6} justifyContent="flex-end">
          <Link>
            <NextLink href="/login">Login</NextLink>
          </Link>
          <Link>
            <NextLink href="/register">Register</NextLink>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
