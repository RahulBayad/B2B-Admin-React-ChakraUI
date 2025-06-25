// components/Sidebar.jsx

import { Box, Heading } from "@chakra-ui/react";
import {
  Box as BoxIcon,
  BookText,
  Landmark,
  BadgeIndianRupee,
  Users,
  Settings,
  MonitorCog,
  Gauge,
} from "lucide-react";

const drawerWidth = 260;

const Header = () => {

  const navMenu = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
      items: [
        { title: "Dashboard Home", url: "/dashboard" },
        { title: "Analytics / Reports", url: "/analytics-reports" },
        { title: "Trends", url: "/trends" },
      ],
    },
    {
      title: "Business",
      url: "/business-entities",
      icon: Landmark,
      items: [
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
      items: [
        { title: "Brands", url: "/brands" },
        { title: "Categories & Subcategories", url: "/categories" },
        { title: "Products", url: "/products" },
      ],
    },
    {
      title: "Sales & Marketing",
      url: "/sales-marketing",
      icon: BadgeIndianRupee,
      items: [
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
      items: [
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
      items: [
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
      items: [
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
      items: [
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
      items: [
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
