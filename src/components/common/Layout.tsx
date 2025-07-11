import { Outlet, useLocation, useNavigation } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, Spinner } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { toaster, Toaster } from "../ui/toaster";

const Layout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <Sidebar />
      
      <Toaster />
      <Box
        bgColor="gray.50"
        _dark={{ bgColor: "transparent" }}
        className="h-full w-full  gap-3"
      >
        <Header />
        <Box overflow="auto" height="92%" width="full" p={3}>
            <Suspense
              fallback={
                <div className="h-full w-full flex items-center justify-center">
                  <Spinner />
                </div>
              }
            >
              <Outlet />
            </Suspense>
        </Box>
      </Box>
      
    </div>
  );
};

export default Layout;
