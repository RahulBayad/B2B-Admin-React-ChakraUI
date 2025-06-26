import React, { memo, useState } from "react";
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
import { Box, Button } from "@chakra-ui/react";

const Sidebar = () => {

  // const location = useLocation()
  const location = window.location.pathname
  console.log("sidebr", location)

  type NavTreeType = { 
    title: string;
    url: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    subMenu? : NavTreeType[]
  };

  const navTree:NavTreeType[] = [
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
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => setSubMenuOpen((prev) => !prev);
    return (
      <div className="relative">
        {/* If there is no submenu  */}
        {!subMenu ? (
          <NavLink to={url ? url : "#"}>
            <Button 
              width="100%" 
              variant="ghost"
              fontWeight={400} 
              padding="0 10px"
              justifyContent="start"
              alignItems="center"
              color="white"
              _hover={{ bg: "blue.900"}}
            >
             {Icon && <Icon size={18} className="stroke-[1.5]"/>} 
             {title}
            </Button>
          </NavLink>
        ) : (
            <Button
              onClick={() => toggleSubMenu()}
              width="100%"
              variant="ghost"
              fontWeight={400}
              padding="0 10px"
              justifyContent="start"
              alignItems="center"
              color="white"
              _hover={{
                bg: location?.pathname?.includes(url) ? "blue.800" : "blue.900",
              }}
              bg={location?.pathname?.includes(url) ? "blue.800" : "" }
            >
              {Icon && <Icon size={18} className="stroke-[1.5]"/>}
              {title}
              <ChevronDown 
                style={{height: "15px", width:"15px"}}
                className={`transition duration-200 absolute float-right right-2
                  ${subMenuOpen ? "transform-[rotate(180deg)]" : ""}`}
              />
            </Button>

        )}
        {/* Submenu  */}
        { subMenu && 
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
                    justifyContent="start"
                    alignItems="center"
                    _hover={{
                      bg: location?.pathname?.includes(url + item.url) ? "blue.900" : "blue.900",
                    }}
                    fontWeight={location?.pathname?.includes(url + item.url) ? "600" : "400" }
                    color={location?.pathname?.includes(url + item.url) ? "white" : "gray.300" }
                  >
                    <Dot/>
                    {item.title}
                  </Button>
                </NavLink>
              );
            })}
          </div>
        }
      </div>
    );
  };

  return (
    <Box borderRightWidth={1} px={2} backgroundColor="blue.950" className="text-sm min-w-[240px] min-h-full overflow-y-auto overflow-x-hidden">
      <figure style={{padding: "10px 0"}} className="flex justify-center">
        <img src="/vite.svg" className="w-20" />
      </figure>
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
