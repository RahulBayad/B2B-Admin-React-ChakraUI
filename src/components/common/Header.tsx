// components/Sidebar.jsx

import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  console.log("header")
  return (
    <Box borderBottomWidth="1px" p="10px" bgColor={{base: "white", _dark: "blackAlpha.300"}} className="border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* <Avatar src="/vite.svg" /> */}
        <Heading>Vite Admin</Heading>
        <div className="flex gap-2">
          
        </div>
      </div>
    </Box>
  );
};

export default Header;
