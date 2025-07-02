// components/Sidebar.jsx

import { Box, Heading, Icon, IconButton, Image, Wrap } from "@chakra-ui/react";
import { Bell, Calendar, CircleUser, Clipboard } from "lucide-react";
import { ColorModeButton } from "../ui/color-mode";

const Header = () => {
  console.log("header")
  return (
    <Box borderBottomWidth="1px" px={3}  height="54px" bgColor={{base: "white", _dark: "blackAlpha.300"}} >
      <div className="flex justify-between items-center h-full">
        <Wrap alignItems="center" gap={3}>
          <Image src="/vite.svg" height={8} />
          <Heading size="lg" fontWeight={500}>Vite Admin</Heading>
        </Wrap>
        <Wrap gap={1}>
          <IconButton variant="outline" color="gray.600"  _dark={{color: 'initial'}}>
            <Icon h="22px" w="22px" strokeWidth={0}  fill="blue.500">
              <Bell/>
            </Icon>
          </IconButton>
          
          <IconButton variant="outline" color="gray.600" _dark={{color: 'initial'}}>
            <Icon h="22px" w="22px" color="blue.600">
              <Calendar style={{width: "22px", height: "22px" }}/>
            </Icon>
          </IconButton>

          <IconButton variant="outline"  color="gray.600" _dark={{color: 'initial'}}>
            <Icon h="22px" w="22px" color="blue.600">
              <Clipboard style={{width: "22px", height: "22px" }}/>
            </Icon>
          </IconButton>

          <ColorModeButton size="md" variant="outline" color="blue.600"/>

          <IconButton variant="outline"  color="gray.600" _dark={{color: 'initial'}}>
            <Icon h="22px" w="22px" color="blue.600">
              <CircleUser style={{width: "22px", height: "22px" }}/>
            </Icon>
          </IconButton>
        </Wrap>
      </div>
    </Box>
  );
};

export default Header;
