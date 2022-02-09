import { Box, Container, HStack, Link, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching, error, data }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  return (
    <Box as="nav" px={2} py={4} bg="teal.100" w="100%">
      <Container maxW="container.xl">
        <HStack
          spacing={6}
          justifyContent="flex-end"
          alignItems={"center"}
          h="max-content">
          {error && <Text color="red.500">Error ...</Text>}

          {data?.me ? (
            <>
              <Text>
                {data.me.username} | {data.me.email}
              </Text>
              <Button
                variant={"link"}
                color="teal.700"
                isLoading={logoutFetching}
                onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : fetching ? (
            <Text>Loading ...</Text>
          ) : (
            <>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
              <NextLink href="/register" passHref>
                <Link>Register</Link>
              </NextLink>
            </>
          )}
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
