import { Box } from "@chakra-ui/react";
import React, { Children } from "react";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box mt={20} mx="auto" w="100%" maxW="400px">
      {children}
    </Box>
  );
};

export default Wrapper;
