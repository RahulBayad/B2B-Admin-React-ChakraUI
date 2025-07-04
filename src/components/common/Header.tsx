// components/Sidebar.jsx

import { Box, Heading, Icon, IconButton, Image, Wrap } from "@chakra-ui/react";
import { Bell, Calendar, Calendar1, CircleUser, Clipboard, ClipboardList, Menu } from "lucide-react";
import { ColorModeButton } from "../ui/color-mode";

const Header = () => {
  console.log("header")
  return (
    <Box borderBottomWidth="1px" px={3}  height="54px" bgColor={{base: "white", _dark: "blackAlpha.300"}} >
      <div className="flex justify-between items-center h-full">
        <Icon cursor="pointer">
          <Menu/>
        </Icon>
        <Wrap gap={0}>
          <IconButton variant="ghost" rounded="full" color="gray.600" _dark={{color: 'initial'}}>
            <Icon h="22px" w="22px" strokeWidth={1} color="blue.700" fill="blue.500">
              <Bell/>
            </Icon>
          </IconButton>
          
          <IconButton variant="ghost" rounded="full" color="gray.600" _dark={{color: 'initial'}}>
            <Icon h="21px" w="21px">
              <Calendar1 />
            </Icon>
          </IconButton>

          <IconButton variant="ghost" rounded="full"  color="gray.600" _dark={{color: 'initial'}}>
            <Icon h="21px" w="21px">
              <ClipboardList/>
            </Icon>
          </IconButton>

          <ColorModeButton size="md" _icon={{w:"22px", h: "22px"}} variant="ghost" rounded="full"/>

          <IconButton variant="ghost" rounded="full"  color="gray.600" _dark={{color: 'initial'}}>
            <Icon h="21px" w="21px">
              <CircleUser/>
            </Icon>
          </IconButton>
        </Wrap>
      </div>
    </Box>
  );
};

export default Header;
