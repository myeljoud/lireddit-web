import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box my={10} w="100%" maxW="500px" bg="white" p={10} rounded={"lg"}>
      {children}
    </Box>
  );
};

export default Wrapper;
