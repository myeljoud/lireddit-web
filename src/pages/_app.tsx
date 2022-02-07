import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { createClient, Provider as UrqlProvider } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UrqlProvider>
  );
}

export default MyApp;
