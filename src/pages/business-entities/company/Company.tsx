import React, { useState, type JSX, type ReactElement } from "react";
import {
  DataTable,
  type TableColumnDef,
} from "../../../components/common/table/DataTable";
import { Link } from "react-router";
import {
  Button,
  createListCollection,
  Dialog,
  Field,
  NativeSelect,
  Portal,
  Select,
} from "@chakra-ui/react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FilterButton from "@/components/common/table/FilterButton";
import FormField from "@/components/ui/FormField";

type CompanyTable = {
  id?: string | number;
  name: string;
  gst?: string;
  pan?: string;
  owner?: string;
  email: string;
  mobile: string;
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
  },
  {
    id: 2,
    name: "DEF Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
  },
  {
    id: 1,
    name: "TKA Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
  },
  {
    id: 4,
    name: "JKL Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
  },
  {
    id: 5,
    name: "MNO Enterprise",
    gst: "231HKV0482KD",
    pan: "HKV0482KD",
    owner: "Ben Stokes",
    email: "benstokes123@gmail.com",
    mobile: "+41 8694562165",
  },
];

const FilterDialog: JSX.Element = () => {
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

  const { control, handleSubmit, reset } = useForm<FilterFormSchema>({
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

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

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
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Filter Company</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Field.Root>
                        <Field.Label>Status</Field.Label>
                        <Select.Root
                          multiple
                          collection={frameworks}
                          value={field.value || []}
                          onChange={field.onChange}
                          size="sm"
                          width="320px"
                        >
                          <Select.HiddenSelect />
                          <Select.Label>Select framework</Select.Label>
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select framework" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content zIndex={1500}>
                                {frameworks.items.map((framework) => (
                                  <Select.Item
                                    item={framework}
                                    key={framework.value}
                                  >
                                    {framework.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      </Field.Root>
                    )}
                  />
                  {/* <Controller
                    name="businessType"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Business Type</InputLabel>
                        <Select
                          multiple
                          //  variant='standard'
                          label="Business Type"
                          size="small"
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="companyType"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Company Type</InputLabel>
                        <Select
                          label="Company Type"
                          //  variant='standard'
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="continent"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Continent</InputLabel>
                        <Select
                          //  variant='standard'
                          label="Continent"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Country</InputLabel>
                        <Select
                          //  variant='standard'
                          label="Country"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">State</InputLabel>
                        <Select
                          //  variant='standard'
                          label="State"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">City</InputLabel>
                        <Select
                          //  variant='standard'
                          label="City"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="interested"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Interested In</InputLabel>
                        <Select
                          //  variant='standard'
                          label="Interested In"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Brand</InputLabel>
                        <Select
                          //  variant='standard'
                          label="Brand"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Category</InputLabel>
                        <Select
                          //  variant='standard'
                          label="Category"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="Wholesale">Wholesale</MenuItem>
                          <MenuItem value="Retail">Retail</MenuItem>
                          <MenuItem value="Private Limited">
                            Private Limited
                          </MenuItem>
                          <MenuItem value="Enterprise">Enterprise</MenuItem>
                          <MenuItem value="B2B">B2B</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="kyc_verified"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">KYC Verified</InputLabel>
                        <Select
                          //  variant='standard'
                          label="KYC Verified"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="enable_billing"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel size="small">Enable Billing</InputLabel>
                        <Select
                          label="Enable Billing"
                          size="small"
                          multiple
                          value={field.value || []}
                          onChange={field.onChange}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  /> */}
                </div>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Button >Cancel</Button>
              <Button variant="solid" type="submit">
                Apply
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

const columns: TableColumnDef<CompanyTable>[] = [
  { accessorKey: "name", header: "Company", width: 150 },
  { accessorKey: "gst", header: "GST", width: 150 },
  { accessorKey: "pan", header: "PAN", width: 150 },
  // {
  //   accessorKey: "gst",
  //   header: "Legal", width: 150,
  //   cell: (params) => (
  //     <div className='flex flex-col'>
  //       <span>GST: {params.row.original.gst}</span>
  //       <span>PAN: {params.row.original.pan}</span>
  //     </div>
  //   )
  // },
  { accessorKey: "owner", header: "Owner Name", width: 150 },
  { accessorKey: "email", header: "Email", width: 150 },
  { accessorKey: "mobile", header: "Contact", width: 150 },
];

const Company = () => {
  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-2">
        <h1>Company</h1>
        <Button size="xs">
          <Link to={"/business-entities/companies/create"}>Add New</Link>
        </Button>
        {/* <Button size="xs"><Link to={"#"}>Add New</Link></Button> */}
      </div>
      <DataTable
        columns={columns}
        data={companyTableData}
        FilterDialog={FilterDialog}
        selectable
      />
    </React.Fragment>
  );
};

export default Company;
