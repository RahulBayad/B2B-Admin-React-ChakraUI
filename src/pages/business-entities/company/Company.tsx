import  { Suspense, type JSX } from "react";
import {
  DataTable,
  type TableColumnDef,
} from "../../../components/ui/table/DataTable";
import { Link } from "react-router";
import {
  Button,
  Card,
  createListCollection,
  Dialog,
  Field,
  Heading,
  Menu,
  Portal,
  Select,
  Wrap,
  type ListCollection,
} from "@chakra-ui/react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FilterButton from "@/components/ui/table/FilterButton";
import StatusTag from "@/components/ui/StatusTag";
import { MessageCircleMore, Star } from "lucide-react";
import { EditBtn, MenuBtn, ViewBtn } from "@/components/ui/table/Buttons";

type CompanyTable = {
  id?: string | number;
  name: string;
  gst?: string;
  pan?: string;
  owner?: string;
  email: string;
  mobile: string;
  status: string;
};



const companyTableData: CompanyTable[] = [
  {
    id: 1,
    name: "ABC Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Active"
  },
  {
    id: 2,
    name: "DEF Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Inactive"
  },
  {
    id: 1,
    name: "TKA Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Verified"
  },
  {
    id: 4,
    name: "JKL Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Unverified"
  },
  {
    id: 5,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Pending"
  },
  {
    id: 6,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Active"
  },
  {
    id: 7,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Active"
  },
  {
    id: 8,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Active"
  },
  {
    id: 9,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Active"
  },
  {
    id: 10,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Active"
  },
  {
    id:11,
    name: "MNO Enterprise 11",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
    status: "Active"
  },
];

const filterOptions = {
  businessType: createListCollection({
    items: [
      { value: "retail", label: "Retail" },
      { value: "technology", label: "Technology" },
      { value: "healthcare", label: "Healthcare" },
      { value: "finance", label: "Finance" },
    ],
  }),
  status: createListCollection({
    items: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
      { value: "suspended", label: "Suspended" },
    ],
  }),
  companyType: createListCollection({
    items: [
      { value: "llc", label: "LLC" },
      { value: "corporation", label: "Corporation" },
      { value: "partnership", label: "Partnership" },
      { value: "sole", label: "Sole Proprietorship" },
    ],
  }),
  continent: createListCollection({
    items: [
      { value: "africa", label: "Africa" },
      { value: "asia", label: "Asia" },
      { value: "australia", label: "Australia" },
      { value: "europe", label: "Europe" },
      { value: "north_america", label: "North America" },
      { value: "south_america", label: "South America" },
    ],
  }),
  country: createListCollection({
    items: [
      { value: "usa", label: "USA" },
      { value: "canada", label: "Canada" },
      { value: "uk", label: "UK" },
      { value: "india", label: "India" },
    ],
  }),
  state: createListCollection({
    items: [
      { value: "california", label: "California" },
      { value: "new_york", label: "New York" },
      { value: "texas", label: "Texas" },
      { value: "florida", label: "Florida" },
    ],
  }),
  city: createListCollection({
    items: [
      { value: "new_york", label: "New York" },
      { value: "los_angeles", label: "Los Angeles" },
      { value: "london", label: "London" },
      { value: "mumbai", label: "Mumbai" },
    ],
  }),
  interested: createListCollection({
    items: [
      { value: "product_a", label: "Product A" },
      { value: "product_b", label: "Product B" },
      { value: "service_a", label: "Service A" },
      { value: "service_b", label: "Service B" },
    ],
  }),
  brand: createListCollection({
    items: [
      { value: "brand_x", label: "Brand X" },
      { value: "brand_y", label: "Brand Y" },
      { value: "brand_z", label: "Brand Z" },
    ],
  }),
  category: createListCollection({
    items: [
      { value: "electronics", label: "Electronics" },
      { value: "fashion", label: "Fashion" },
      { value: "food", label: "Food" },
      { value: "health", label: "Health" },
    ],
  }),
  kyc_verified: createListCollection({
    items: [
      { value: "verified", label: "Verified" },
      { value: "not_verified", label: "Not Verified" },
      { value: "pending", label: "Pending" },
    ],
  }),
  enable_billing: createListCollection({
    items: [
      { value: "enabled", label: "Enabled" },
      { value: "disabled", label: "Disabled" },
    ],
  }),
};

const FilterDialog = () => {
  const filterSchema = z.object({
    businessType: z.array(z.string()).nullable().optional(),
    status: z.array(z.string()).optional(),
    companyType: z.array(z.string()).optional(),
    continent: z.array(z.string()).optional(),
    country: z.array(z.string()).optional(),
    state: z.array(z.string()).optional(),
    city: z.array(z.string()).optional(),
    interested: z.array(z.string()).optional(),
    brand: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
    kyc_verified: z.array(z.string()).optional(),
    enable_billing: z.array(z.string()).optional(),
    created_date: z.date().nullable().optional(),
  });
  type FilterFormSchema = z.infer<typeof filterSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterFormSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      status: [],
      businessType: [],
      companyType: [],
      continent: [],
      country: [],
      state: [],
      city: [],
      interested: [],
      brand: [],
      category: [],
      kyc_verified: [],
      enable_billing: [],
      created_date: null,
    },
  });

  const renderMultiSelect = (
    name: keyof FilterFormSchema,
    label: string,
    items: ListCollection<{ value: string; label: string }>
  ) => (
    <Field.Root>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select.Root
            multiple
            collection={items}
            size="sm"
            value={(field.value as string[]) || []}
            onValueChange={(details) => field.onChange(details.value)}
          >
            <Select.HiddenSelect />
            <Select.Label>{label}</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={`Select ${label}`} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.ClearTrigger />
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {items.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />
      <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
    </Field.Root>
  )

  const submitHandler: SubmitHandler<FilterFormSchema> = (data) => {
    console.log("form data", data);
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <FilterButton />
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxWidth={800}>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Filters</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form id="filterForm" onSubmit={handleSubmit(submitHandler)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderMultiSelect(
                    "businessType",
                    "Business Type",
                    filterOptions.businessType
                  )}
                  {renderMultiSelect("status", "Status", filterOptions.status)}
                  {renderMultiSelect(
                    "companyType",
                    "Company Type",
                    filterOptions.companyType
                  )}
                  {renderMultiSelect(
                    "continent",
                    "Continent",
                    filterOptions.continent
                  )}
                  {renderMultiSelect(
                    "country",
                    "Country",
                    filterOptions.country
                  )}
                  {renderMultiSelect("state", "State", filterOptions.state)}
                  {renderMultiSelect("city", "City", filterOptions.city)}
                  {renderMultiSelect(
                    "interested",
                    "Interested In",
                    filterOptions.interested
                  )}
                  {renderMultiSelect("brand", "Brand", filterOptions.brand)}
                  {renderMultiSelect(
                    "category",
                    "Category",
                    filterOptions.category
                  )}
                  {renderMultiSelect(
                    "kyc_verified",
                    "KYC Verification",
                    filterOptions.kyc_verified
                  )}
                  {renderMultiSelect(
                    "enable_billing",
                    "Billing Status",
                    filterOptions.enable_billing
                  )}
                </div>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
              <Button variant="solid" type="submit" form="filterForm">
                Apply
              </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

const columns: TableColumnDef<CompanyTable>[] = [
  { accessorKey: "name", header: "Company", width: 150 },
  { 
    accessorKey: "status", 
    header: "Status", 
    width: 150,
    cell : (props) => {
      const { status } = props.row.original
      return (
        <StatusTag label={status}/>
      )
    }
  },
  { accessorKey: "gst", header: "GST", width: 150 },
  { accessorKey: "pan", header: "PAN", width: 150 },
  { accessorKey: "owner", header: "Owner Name", width: 150 },
  { accessorKey: "email", header: "Email", width: 150 },
  { accessorKey: "mobile", header: "Contact", width: 150 },
  { 
    id: "action", 
    header: "Action", 
    width: 150,
    cell : (props) => {
      // const { id } = props.row.original
      return (
        <Wrap gap={1} flexWrap="nowrap">
          <EditBtn />
          <ViewBtn />
          <Menu.Root>
            <Menu.Trigger asChild>
              <MenuBtn />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="1"><MessageCircleMore width={16}/>Message</Menu.Item>
                  <Menu.Item value="2"><Star width={16}/>Favourite</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Wrap>
      )
    }
  },
];

const Company = () => {
  return (
    <Card.Root borderRadius="lg" minHeight="full">
      <Card.Body>
        <div className="flex justify-between items-center mb-2">
          <Heading size="lg">Company</Heading>
            <Link to={"/business-entities/companies/create"}>
          <Button size="xs">
            Add New
          </Button>
            </Link>
          {/* <Button size="xs"><Link to={"#"}>Add New</Link></Button> */}
        </div>
        <DataTable
          columns={columns}
          data={companyTableData}
          FilterDialog={FilterDialog}
          selectable
        />
      </Card.Body>
    </Card.Root>
  );
};

export default Company;
