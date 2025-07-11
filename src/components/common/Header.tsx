// components/Sidebar.jsx

import {
  Avatar,
  Box,
  Heading,
  Icon,
  IconButton,
  Image,
  Wrap,
} from "@chakra-ui/react";
import {
  Bell,
  Calendar,
  Calendar1,
  CircleUser,
  Clipboard,
  ClipboardList,
  Menu,
} from "lucide-react";
import { ColorModeButton } from "../ui/color-mode";
import { toaster } from "../ui/toaster";

const Header = () => {
  console.log("header");
  return (
    <Box
      borderBottomWidth="1px"
      px={3}
      height="54px"
      // bg={{ , _dark: "blackAlpha.300" }}
      bg="white"
      _dark={{
        bg: "black"
      }}
      backdropFilter="blur(2px)"
    >
      <div className="flex justify-between items-center h-full">
        <Icon cursor="pointer">
          <Menu />
        </Icon>
        <Wrap gap={0} alignItems="center">
          <IconButton
            title="Notifications"
            variant="ghost"
            rounded="full"
            color="gray.600"
            _dark={{ color: "initial" }}
          >
            <Icon
              h="22px"
              w="22px"
              strokeWidth={1}
              color="blue.700"
              fill="blue.500"
            >
              <Bell />
            </Icon>
          </IconButton>

          <IconButton
            title="Reminder"
            variant="ghost"
            rounded="full"
            color="gray.600"
            _dark={{ color: "initial" }}
          >
            <Icon h="21px" w="21px">
              <Calendar1 />
            </Icon>
          </IconButton>

          <IconButton
            title="Tasks"
            variant="ghost"
            rounded="full"
            color="gray.600"
            _dark={{ color: "initial" }}
          >
            <Icon h="21px" w="21px">
              <ClipboardList />
            </Icon>
          </IconButton>

          <ColorModeButton
            size="md"
            _icon={{ w: "22px", h: "22px" }}
            variant="ghost"
            rounded="full"
          />

          <Avatar.Root
            colorPalette="orange"
            ml={1}
            size="sm"
          >
            <Avatar.Fallback name="Rahul Bayad" />
            <Avatar.Image src="/userAvatar.jpg" h="36px" w="36px" />
          </Avatar.Root>
        </Wrap>
      </div>
    </Box>
  );
};

export default Header;
