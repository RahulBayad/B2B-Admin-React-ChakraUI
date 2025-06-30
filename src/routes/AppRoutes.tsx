import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import ProtectedRoutes from './ProtectedRoutes'

const Dashboard = lazy(()=> import('@/pages/dashboard/Dashboard'));

const Company = lazy(()=> import('../pages/business-entities/company/Company'));
const CreateCompany = lazy(()=> import('../pages/business-entities/company/components/CreateCompany'));
const Members = lazy(()=> import('../pages/business-entities/members/Members'));
const AllDocument = lazy(()=> import('../pages/business-entities/all-document/AllDocument'));
const Inquiries = lazy(()=> import('../pages/business-entities/inquiries/Inquiries'));
const Partner = lazy(()=> import('../pages/business-entities/partner/Partner'));

const Brands = lazy(()=> import('../pages/product-management/brands/Brands'));
const Category = lazy(()=> import('../pages/product-management/category-subcategory/Category'));
const Products = lazy(()=> import('../pages/product-management/products/Products'));

const Leads = lazy(()=> import('../pages/sales-marketing/Leads/Leads'));
const AutomailTemplate = lazy(()=> import('../pages/sales-marketing/autoemail-template/AutomailTemplate'));
const AutomationMail = lazy(()=> import('../pages/sales-marketing/automation-email/AutomationMail'));
const EmailCampaign = lazy(()=> import('../pages/sales-marketing/email-campaign/EmailCampaign'));
const EmailTemplate = lazy(()=> import('../pages/sales-marketing/email-template/EmailTemplate'));
const OfferDemand = lazy(()=> import('../pages/sales-marketing/offers-demands/OfferDemand'));
const Opportunity = lazy(()=> import('../pages/sales-marketing/opportunity/Opportunity'));
const RequestFeeback = lazy(()=> import('../pages/sales-marketing/request-feedback/RequestFeeback'));
const Subscribers = lazy(()=> import('../pages/sales-marketing/subscribers/Subscribers'));
const WallListing = lazy(()=> import('../pages/sales-marketing/wall-listing/WallListing'));

const Department = lazy(()=> import('../pages/hr-employees/Department/Department'));
const Designation = lazy(()=> import('../pages/hr-employees/Designation/Designation'));
const Employee = lazy(()=> import('../pages/hr-employees/Employee/Employee'));
const AccessControl = lazy(()=> import('../pages/hr-employees/access-control/AccessControl'));
const JobListing = lazy(()=> import('../pages/hr-employees/job-listings/JobListing'));
const JobApplication = lazy(()=> import('../pages/hr-employees/job-application/JobApplication'));
const JobDepartment = lazy(()=> import('../pages/hr-employees/job-department/JobDepartment'));
const JobPost = lazy(()=> import('../pages/hr-employees/job-post/JobPost'));
const TaskBoard = lazy(()=> import('../pages/hr-employees/taskboard/TaskBoard'));
const Tasklist = lazy(()=> import('../pages/hr-employees/tasklist/Tasklist'));

const Blog = lazy(()=> import('../pages/web-settings/blog/Blog'));
const HomeCategoryImage = lazy(()=> import('../pages/web-settings/home-category-image/HomeCategoryImage'));
const Slider = lazy(()=> import('../pages/web-settings/sliders/Slider'));
const TrendingCarousel = lazy(()=> import('../pages/web-settings/trending-carousel/TrendingCarousel'));
const TrendingImage = lazy(()=> import('../pages/web-settings/trending-image/TrendingImage'));

const CompanyProfile = lazy(()=> import('../pages/admin-settings/company-profiles/CompanyProfile'));
const DomainManagement = lazy(()=> import('../pages/admin-settings/domain-management/DomainManagement'));
const GlobalSettings = lazy(()=> import('../pages/admin-settings/global-settings/GlobalSettings'));
const NumberSystem = lazy(()=> import('../pages/admin-settings/number-system/NumberSystem'));

const BugReport = lazy(()=> import('../pages/system-tools/bug-report/BugReport'));
const ChangeLog = lazy(()=> import('../pages/system-tools/change-log/ChangeLog'));
const FormBuilder = lazy(()=> import('../pages/system-tools/form-builder/FormBuilder'));
const RowData = lazy(()=> import('../pages/system-tools/row-data/RowData'));

const Continents = lazy(()=> import('../pages/master/continents/Continents'));
const Countries = lazy(()=> import('../pages/master/countries/Countries'));
const Currency = lazy(()=> import('../pages/master/currency/Currency'));
const DocumentList = lazy(()=> import('../pages/master/document-list/DocumentList'));
const DocumentTypes = lazy(()=> import('../pages/master/document-type/DocumentTypes'));
const PaymentTerms = lazy(()=> import('../pages/master/payment-terms/PaymentTerms'));
const PriceList = lazy(()=> import('../pages/master/price-list/PriceList'));
// const ProductSpec = lazy(()=> import('../pages/master/product-spec/ProductSpec'));
const Units = lazy(()=> import('../pages/master/units/Units'));
const ExportMapping = lazy(()=> import('../pages/master/export-mapping/ExportMapping'));

const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            element : <PublicRoutes/>
        },
        {
            element : <ProtectedRoutes/>,
            children : [
                {  path: "/", element : <Dashboard/> },
                {  
                    path: "/business-entities",
                    children : [
                        { path: "companies", element: <Company/> },
                        { path: "companies/create", element : <CreateCompany/> },
                        { path: "members", element: <Members/> },
                        { path: "partners", element: <Partner/> },
                        { path: "inquiries", element: <Inquiries/> },
                        { path: "all-documents", element: <AllDocument/> },
                    ]
                },
                {  
                    path: "/product-management",
                    children : [
                        { path: "brands", element: <Brands/> },
                        { path: "categories", element: <Category/> },
                        { path: "products", element: <Products/> },
                    ]
                },
                {  
                    path: "/sales-marketing",
                    children : [
                        { path: "wall-listing", element: <WallListing/> },
                        { path: "opportunities", element: <AllDocument/> },
                        { path: "offers-demands", element: <OfferDemand/> },
                        { path: "leads", element: <Leads/> },
                        { path: "email-campaign", element: <EmailCampaign/> },
                        { path: "automation-email", element: <AutomationMail/> },
                        { path: "email-templates", element: <EmailTemplate/> },
                        { path: "subscribers", element: <Subscribers/> },
                        { path: "request-feedback", element: <RequestFeeback/> },
                    ]
                },
                {  
                    path: "/hr-employees",
                    children : [
                        { path: "employees", element: <Employee/> },
                        { path: "designation", element: <Designation/> },
                        { path: "department", element: <Department/> },
                        { path: "job-listings" , element: <JobListing/>},
                        { path: "access-control", element: <AccessControl/> },
                        { path: "task-list", element: <Tasklist/> },
                        { path: "task-board", element: <TaskBoard/> },
                    ]
                },
                {  
                    path: "/web-settings",
                    children : [
                        { path: "home-category-image", element: <HomeCategoryImage/> },
                        { path: "trending-image", element: <TrendingImage/> },
                        { path: "trending-carousel" , element: <TrendingCarousel/>},
                        { path: "sliders" , element: <Slider/>},
                        { path: "blog" , element: <Blog/>},
                    ]
                },
                {  
                    path: "/admin-settings",
                    children : [
                        { path: "company-profile", element: <CompanyProfile/> },
                        { path: "global-settings", element: <GlobalSettings/> },
                        { path: "domain-management" , element: <DomainManagement/>},
                        { path: "number-system", element: <NumberSystem/> },
                    ]
                },
                {  
                    path: "/system-tools",
                    children : [
                        { path: "form-builder", element: <FormBuilder/> },
                        { path: "row-data", element: <RowData/> },
                        { path: "bug-report" , element: <BugReport/>},
                        { path: "change-log", element: <ChangeLog/> },
                    ]
                },
                {  
                    path: "/master",
                    children : [
                        { path: "document-type", element: <DocumentTypes/> },
                        { path: "payment-terms", element: <PaymentTerms/> },
                        { path: "currency", element: <Currency/> },
                        { path: "units", element: <Units/> },
                        { path: "continents", element: <Continents/> },
                        { path: "countries" , element: <Countries/>},
                        { path: "price-list" , element: <PriceList/>},
                        { path: "document-list", element: <DocumentList/> },
                        { path: "export-mapping", element: <ExportMapping/> },
                    ]
                },
            ]
        }
    ])

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default AppRoutes