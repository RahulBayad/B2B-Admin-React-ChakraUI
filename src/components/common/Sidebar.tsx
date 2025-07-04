import React, { memo, useEffect, useState } from "react";
import {
  Box as BoxIcon,
  BookText,
  Landmark,
  BadgeIndianRupee,
  Users,
  Settings,
  MonitorCog,
  Gauge,
  Dot,
  ChevronDown,
  type LucideProps,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { Box, Button, Heading, Image, Text, Wrap } from "@chakra-ui/react";

const Sidebar = () => {
  // const location = useLocation()

  type NavTreeType = {
    title: string;
    url: string;
    icon?: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    subMenu?: NavTreeType[];
  };

  const navTree: NavTreeType[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: Gauge,
    },
    {
      title: "Business",
      url: "/business-entities",
      icon: Landmark,
      subMenu: [
        { title: "Companies", url: "/companies" },
        { title: "Members", url: "/members" },
        { title: "Partners", url: "/partners" },
        { title: "Inquiries", url: "/inquiries" },
        { title: "All Documents", url: "/all-documents" },
      ],
    },
    {
      title: "Product Management",
      url: "/product-management",
      icon: BoxIcon,
      subMenu: [
        { title: "Brands", url: "/brands" },
        { title: "Categories & Subcategories", url: "/categories" },
        { title: "Products", url: "/products" },
      ],
    },
    {
      title: "Sales & Marketing",
      url: "/sales-marketing",
      icon: BadgeIndianRupee,
      subMenu: [
        { title: "Wall Listings", url: "/wall-listing" },
        { title: "Opportunities", url: "/opportunities" },
        { title: "Offers & Demands", url: "/offers-demands" },
        { title: "Leads", url: "/leads" },
        { title: "Email Campaigns", url: "/email-campaign" },
        { title: "Automation Emails", url: "/automation-email" },
        { title: "Email Templates", url: "/email-templates" },
        { title: "Subscribers", url: "/subscribers" },
        { title: "Feedback / Requests", url: "/request-feedback" },
      ],
    },
    {
      title: "HR & Employees",
      url: "/hr-employees",
      icon: Users,
      subMenu: [
        { title: "Employee Directory", url: "/employees" },
        { title: "Designations", url: "/designation" },
        { title: "Departments", url: "/department" },
        { title: "Job Listings", url: "/job-listings" },
        { title: "Roles & Permissions", url: "/access-control" },
        { title: "Task List", url: "/task-list" },
        { title: "Task Board", url: "/task-board" },
      ],
    },
    {
      title: "Web Settings",
      url: "/web-settings",
      icon: MonitorCog,
      subMenu: [
        { title: "Home Categories", url: "/home-category-image" },
        { title: "Trending Images", url: "/trending-image" },
        { title: "Carousels", url: "/trending-carousel" },
        { title: "Sliders", url: "/sliders" },
        { title: "Blog", url: "/blog" },
      ],
    },
    {
      title: "Admin Settings",
      url: "/admin-settings",
      icon: Settings,
      subMenu: [
        { title: "Company Profile", url: "/company-profile" },
        { title: "Global Settings", url: "/global-settings" },
        { title: "Domain Management", url: "/domain-management" },
        { title: "Number System", url: "/number-system" },
      ],
    },
    {
      title: "System Tools",
      url: "/system-tools",
      icon: Settings,
      subMenu: [
        { title: "Form Builder", url: "/form-builder" },
        { title: "Row Data", url: "/row-data" },
        { title: "Bug Reports", url: "/bug-report" },
        { title: "Change Log", url: "/change-log" },
      ],
    },
    {
      title: "Master Data",
      url: "/master",
      icon: BookText,
      subMenu: [
        { title: "Document Types", url: "/document-type" },
        { title: "Payment Terms", url: "/payment-terms" },
        { title: "Currency", url: "/currency" },
        { title: "Units", url: "/units" },
        { title: "Continents", url: "/continents" },
        { title: "Countries", url: "/countries" },
        { title: "Price List", url: "/price-list" },
        { title: "Documents List", url: "/document-list" },
        { title: "Export Mapping", url: "/export-mapping" },
      ],
    },
  ];

  // Sidebar Items
  const SidebarItem = ({ title, url, icon: Icon, subMenu }: NavTreeType) => {
    const currentPath = useLocation();
    const activeLinkPath = currentPath.pathname;

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => setSubMenuOpen((prev) => !prev);

    useEffect(() => {
      activeLinkPath.includes(url) ? setSubMenuOpen(true) : "";
    }, []);
    return (
      <div className="relative">
        {/* If there is no submenu  */}
        {!subMenu ? (
          <NavLink to={url ? url : "#"}>
            <Button
              width="100%"
              variant="ghost"
              fontSize="0.825rem"
              padding="0 10px"
              justifyContent="start"
              alignItems="center"
              gap={4}
              borderColor="primary.100"
              borderWidth={activeLinkPath === url ? 1 : 0}
              bgColor={activeLinkPath === url ? "blue.50" : ""}
              color={activeLinkPath === url ? "primary.600" : ""}
              _dark={{
                border: "none",
                bg: activeLinkPath === url ? "gray.800" : "",
                fontWeight: 800,
              }}
            >
              {Icon && <Icon size={18} style={{ width: "1.1rem" }} />}
              <Text fontWeight={500}>{title}</Text>
            </Button>
          </NavLink>
        ) : (
          <Button
            onClick={() => toggleSubMenu()}
            width="100%"
            variant="ghost"
            padding="0 10px"
            justifyContent="start"
            alignItems="center"
            gap={4}
            fontSize="0.825rem"
            borderWidth={activeLinkPath.includes(url) ? 1 : 0}
            borderColor="primary.100"
            bg={activeLinkPath.includes(url) ? "blue.50" : ""}
            color={activeLinkPath.includes(url) ? "primary.600" : ""}
            _dark={{
              border: "none",
              bg: activeLinkPath.includes(url) ? "gray.800" : "",
              fontWeight: 800,
            }}
          >
            {Icon && <Icon style={{ width: "1.1rem" }} />}
            <Text fontWeight={500}>{title}</Text>
            <ChevronDown
              style={{ height: "15px", width: "15px" }}
              className={`transition duration-200 absolute float-right right-2
                  ${subMenuOpen ? "transform-[rotate(180deg)]" : ""}`}
            />
          </Button>
        )}
        {/* Submenu  */}
        {subMenu && (
          <div
            className={`flex flex-col duration-200 ease-linear transition-all overflow-hidden ${
              subMenuOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            {subMenu.map((item, index) => {
              return (
                <NavLink key={index} to={url + item.url} className="">
                  <Button
                    variant="ghost"
                    width="100%"
                    padding="0 10px"
                    textAlign="left"
                    overflow="hidden"
                    justifyContent="start"
                    alignItems="center"
                    gap={4}
                    fontSize="0.8rem"
                    color={
                      activeLinkPath.includes(url + item.url)
                        ? "primary.600"
                        : ""
                    }
                  >
                    <Dot style={{ width: "1.1rem" }} />
                    <Text
                      fontWeight={500}
                      textOverflow="ellipsis"
                      className="text-ellipsis"
                    >
                      {item.title}
                    </Text>
                  </Button>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <Box
      borderRightWidth={1}
      p={2}
      // rounded="md"
      bg="white"
      _dark={{
        bg: "transparent",
      }}
      borderWidth={1}
      borderTopWidth={0}
      className="text-sm min-w-[250px] overflow-y-auto overflow-x-hidden"
    >
      <Wrap alignItems="center" gap={3}>
        <Image src="/vite.svg" height={11} />
        <Heading size="xl" fontWeight={500}>Vite Admin</Heading>
      </Wrap>
      <br />
      {navTree.map((nav, index) => (
        <div key={index} className="">
          <SidebarItem
            url={nav.url}
            title={nav.title}
            icon={nav.icon}
            subMenu={nav.subMenu}
          />
        </div>
      ))}
    </Box>
  );
};

export default memo(Sidebar);
