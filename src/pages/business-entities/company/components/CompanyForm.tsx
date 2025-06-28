import {
  renderInput,
  renderInputFile,
  renderSelect,
} from "@/components/ui/form/formInput";
import {
  Box,
  Button,
  Card,
  Heading,
  IconButton,
  Separator,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { officeTypes } from "./OfficeLocation";

const CompanyForm = () => {
  const fileSchema = z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= 3_000_000, {
      message: "File size must be less than 3MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(
          file.type
        ),
      {
        message: "File must be a PDF, JPG, or PNG",
      }
    );

  const companyFormSchema = z.object({
    company_name: z
      .string({ required_error: "Company Name is required" })
      .trim()
      .min(2, { message: "Name must be larger than 2 characters" }),
    ownership: z.string().trim().optional(),
    owner: z.string().trim().optional(),
    establishment_year: z.coerce.number().nullable().optional(),
    company_type: z.string().trim().optional(),
    company_website: z.string().trim().optional(),
    company_logo_brochure: z.string().trim().optional(),
    status: z
      .object({ label: z.string(), value: z.string() })
      .nullable()
      .refine((data) => data !== null && !!data.value, {
        message: "Status is required",
      }),
    // status: z.array(z.object({label: z.string(), value: z.string()})).nullable().optional(),
    country: z.string().trim().optional(),
    state: z.string().trim().optional(),
    city: z.string().trim().optional(),
    zip_postal_code: z.coerce.number().nullable().optional(),
    address: z.string().trim().optional(),
    primary_contact_number: z.coerce.number().nullable().optional(),
    primary_contact_number_code: z.coerce.number().nullable().optional(), // Made optional to avoid missing input issue
    alternate_contact_number: z.coerce.number().nullable().optional(),
    alternate_contact_country_code: z.coerce.number().nullable().optional(),
    primary_email: z
      .string()
      .trim()
      .min(1, { message: "Primary Email is required" }),
    alternate_email: z.string().trim().optional(),
    notification_email: z.string().trim().optional(),
    gst_number: z.string().trim().optional(),
    pan_number: z.string().trim().optional(),
    trn_number: z.string().trim().optional(),
    tan_number: z.string().trim().optional(),
    primary_business_type: z.string().trim().optional(),
    primary_business_category: z.string().trim().optional(),
    sub_category: z.string().trim().optional(),
    interested_in: z.string().trim().optional(),
    gst_certificate: fileSchema,
    "194Q_declaration": fileSchema,
    headOffice: z
      .object({
        officeName: z.string().nullable().optional(),
        office_gst: z.string().nullable().optional(),
        contact_person: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        phone: z.string().nullable().optional(),
        address: z.object({
          country: z
            .object({ label: z.string(), value: z.string() })
            .nullable().optional(),
          state: z.object({ label: z.string(), value: z.string() }).nullable().optional(),
          city: z.object({ label: z.string(), value: z.string() }).nullable().optional(),
          pincode: z.coerce.number().nullable().optional(),
          location: z.string().nullable().optional(),
        }).nullable().optional(),
      })
      .nullable()
      .optional(),
    offices: z
      .array(
        z.object({
          officeType: z
            .object({ label: z.string(), value: z.string() })
            .nullable(),
          officeName: z.string().nullable().optional(),
          office_gst: z.string().nullable().optional(),
          contact_person: z.string().nullable().optional(),
          email: z.string().nullable().optional(),
          phone: z.string().nullable().optional(),
          address: z
            .object({
              country: z
                .object({ label: z.string(), value: z.string() })
                .nullable(),
              state: z
                .object({ label: z.string(), value: z.string() })
                .nullable(),
              city: z
                .object({ label: z.string(), value: z.string() })
                .nullable(),
              pincode: z.coerce.number().nullable().optional(),
              location: z.string().nullable().optional(),
            })
            .nullable()
            .optional(),
        })
      )
      .nullable()
      .optional(),
    pan_card: fileSchema,
    authority_letter: fileSchema,
    primary_account_number: z.string().trim().optional(),
    primary_ifsc_code: z.string().trim().optional(),
    primary_bank_name: z.string().trim().optional(),
  });

  type CompanyFormSchema = z.infer<typeof companyFormSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormSchema>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      company_name: "",
      ownership: "",
      owner: "",
      establishment_year: null,
      company_type: "",
      company_website: "",
      company_logo_brochure: "",
      status: null,
      country: "",
      state: "",
      city: "",
      zip_postal_code: null,
      address: "",
      primary_contact_number: null,
      primary_contact_number_code: null,
      alternate_contact_number: null,
      alternate_contact_country_code: null,
      primary_email: "",
      alternate_email: "",
      notification_email: "",
      gst_number: "",
      pan_number: "",
      trn_number: "",
      tan_number: "",
      primary_business_type: "",
      primary_business_category: "",
      sub_category: "",
      interested_in: "",
      gst_certificate: null,
      pan_card: null,
      authority_letter: null,
      "194Q_declaration": null,
      offices: null,
      primary_account_number: "",
      primary_ifsc_code: "",
      primary_bank_name: "",
    },
  });

  const submitHandler = (data: CompanyFormSchema) => {
    console.log("Data", data);
  };
  const onError = (errors: FieldErrors<CompanyFormSchema>) => {
    console.error("Validation Errors", errors);
  };

  return (
    <div>
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link to="/business-entities/companies" className="hover:underline">
          MUI
        </Link>
        <Heading mb={4} style={{ color: "text.primary" }}>Breadcrumbs</Heading>
      </Breadcrumbs> */}

      <Card.Root>
        <Card.Body
          bgColor="white"
          _dark={{
            bgColor: "initial",
          }}
          shadow="xl"
          borderRadius="md"
        >
          <form onSubmit={handleSubmit(submitHandler, onError)} className="">
            <div>
              <Heading mb={4}>Primary Information</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
                {renderInput<CompanyFormSchema>({
                  fieldName: "company_name",
                  label: "Company Name",
                  placeholder: "e.g. Acme Communication",
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "status",
                  label: "Status",
                  placeholder: "Select Status",
                  options: [
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                  ],
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "ownership",
                  label: "Ownership Type",
                  placeholder: "Select Ownership Type",
                  options: [
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                  ],
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "owner",
                  label: "Owner Name",
                  placeholder: "Enter Owner Name",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "establishment_year",
                  label: "Establishment Year",
                  placeholder: "Enter Establishment Year",
                  inputType: "number",
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "primary_business_type",
                  label: "Business Type",
                  placeholder: "Select Business Type",
                  options: [
                    { label: "Export", value: "Export" },
                    { label: "Import", value: "Import" },
                  ],
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "primary_business_category",
                  label: "Business Category",
                  placeholder: "Select Business Category",
                  options: [
                    { label: "Electronics", value: "Electronics" },
                    { label: "Engineering", value: "Engineering" },
                    { label: "Plastic", value: "Plastic" },
                    { label: "Food", value: "Food" },
                  ],
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "sub_category",
                  label: "Sub Category",
                  placeholder: "Select Sub Category",
                  options: [
                    { label: "Export", value: "Export" },
                    { label: "Import", value: "Import" },
                  ],
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "company_website",
                  label: "Company Website (URL)",
                  placeholder: "Enter Company Website",
                  control,
                  errors,
                })}

                {renderInputFile<CompanyFormSchema>({
                  fieldName: "company_logo_brochure",
                  label: "Company Logo (URL)",
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "country",
                  label: "Country",
                  placeholder: "Select Country",
                  options: [
                    { label: "India", value: "India" },
                    { label: "Nepal", value: "Nepal" },
                  ],
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "state",
                  label: "State",
                  placeholder: "Select State",
                  options: [
                    { label: "Gujarat", value: "Gujarat" },
                    { label: "Maharashtra", value: "Maharashtra" },
                  ],
                  control,
                  errors,
                })}

                {renderSelect<CompanyFormSchema>({
                  fieldName: "city",
                  label: "City",
                  placeholder: "Select City",
                  options: [
                    { label: "Ahmedabad", value: "Ahmedabad" },
                    { label: "Mumbai", value: "Mumbai" },
                  ],
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "zip_postal_code",
                  label: "Zip/Postal Code",
                  placeholder: "e.g. 350021...",
                  inputType: "number",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "address",
                  label: "Address",
                  placeholder: "Enter Address",
                  control,
                  errors,
                })}
              </div>

              <br />
              <Separator />
              <br />

              <Heading mb={4}>Contact Information</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {renderInput<CompanyFormSchema>({
                  fieldName: "primary_email",
                  label: "Primary Email Address",
                  placeholder: "e.g. xyz@gmail.com...",
                  inputType: "email",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "alternate_email",
                  label: "Alternate Email Address",
                  placeholder: "e.g. abc@gmail.com...",
                  inputType: "email",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "primary_contact_number",
                  label: "Primary Contact Number",
                  placeholder: "Enter Contact Number",
                  inputType: "number",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "alternate_contact_number",
                  label: "Alternate Contact Number",
                  placeholder: "Enter Alternate Contact Number",
                  inputType: "number",
                  control,
                  errors,
                })}
              </div>

              <br />
              <Separator />
              <br />

              <Heading mb={4} style={{ fontSize: "1.2rem" }}>
                Business Details
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {renderInput<CompanyFormSchema>({
                  fieldName: "pan_number",
                  label: "PAN Number",
                  placeholder: "Enter PAN Number",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "gst_number",
                  label: "GST Number",
                  placeholder: "Enter GST Number",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "trn_number",
                  label: "TRN Number",
                  placeholder: "Enter TRN Number",
                  control,
                  errors,
                })}

                {renderInput<CompanyFormSchema>({
                  fieldName: "tan_number",
                  label: "TAN Number",
                  placeholder: "Enter TAN Number",
                  control,
                  errors,
                })}
              </div>

              <br />
              <Separator />
              <br />

              <Heading mb={4}>Documents</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {renderInputFile<CompanyFormSchema>({
                  fieldName: "pan_card",
                  label: "PAN Certificate",
                  control,
                  errors,
                })}

                {renderInputFile<CompanyFormSchema>({
                  fieldName: "gst_certificate",
                  label: "GST Certificate",
                  control,
                  errors,
                })}

                {renderInputFile<CompanyFormSchema>({
                  fieldName: "authority_letter",
                  label: "Authority Letter",
                  control,
                  errors,
                })}

                {renderInputFile<CompanyFormSchema>({
                  fieldName: "194Q_declaration",
                  label: "194Q Declaration",
                  control,
                  errors,
                })}
              </div>

              <br />
              <Separator />
              <br />
              <Box>
                <Box className="text-right flex justify-between" mb={2}>
                  <Heading>Office Information</Heading>
                </Box>
                <Card.Root>
                  <Card.Body px={4} py={4}>
                    <Box position="relative">
                      <Box mb={2} className="flex justify-between items-center">
                        <Heading size="lg">Head Office</Heading>
                      </Box>
                      <Box
                        borderWidth={1}
                        p={4}
                        className="relative rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {renderInput<CompanyFormSchema>({
                          fieldName: "headOffice.officeName",
                          label: "Office Name",
                          control: control,
                          placeholder: "Enter Office Name",
                        })}
                        {renderInput<CompanyFormSchema>({
                          fieldName: "headOffice.office_gst",
                          label: "GST/REG. Number",
                          control: control,
                          placeholder: "Enter Office Name",
                        })}
                        {renderInput<CompanyFormSchema>({
                          fieldName: "headOffice.contact_person",
                          label: "Contact Person",
                          control: control,
                          placeholder: "Enter Office Name",
                        })}
                        {renderInput<CompanyFormSchema>({
                          fieldName: "headOffice.email",
                          label: "Email Address",
                          control: control,
                          placeholder: "Enter Office Name",
                          inputType: "email",
                        })}
                        {renderInput<CompanyFormSchema>({
                          fieldName: "headOffice.phone",
                          label: "Contact Number",
                          control: control,
                          placeholder: "Contact Number",
                          inputType: "number",
                        })}
                        {renderSelect<CompanyFormSchema>({
                          fieldName: "headOffice.address.country",
                          label: "Country",
                          options: [
                            { label: "India", value: "India" },
                            { label: "Nepal", value: "Nepal" },
                          ],
                          control: control,
                          placeholder: "Select Country",
                        })}
                        {renderSelect<CompanyFormSchema>({
                          fieldName: "headOffice.address.state",
                          label: "State",
                          options: [
                            { label: "Gujarat", value: "Gujarat" },
                            { label: "Rajasthan", value: "Rajasthan" },
                          ],
                          control: control,
                          placeholder: "Select State",
                        })}
                        {renderSelect<CompanyFormSchema>({
                          fieldName: "headOffice.address.city",
                          label: "City",
                          options: [
                            { label: "Ahmedabad", value: "Ahmedabad" },
                            { label: "Gandhinagar", value: "Gandhinagar" },
                          ],
                          control: control,
                          placeholder: "Select City",
                        })}
                        {renderInput<CompanyFormSchema>({
                          fieldName: "headOffice.address.pincode",
                          label: "Zip/Postal Code",
                          control: control,
                          placeholder: "e.g. 680291...",
                          inputType: "number",
                        })}
                        {renderInput<CompanyFormSchema>({
                          fieldName: "headOffice.address.location",
                          label: "Location",
                          control: control,
                          placeholder: "e.g. 70/703, Keshav Apartments...",
                        })}
                      </Box>
                      <br />
                    </Box>
                    {officeTypes<CompanyFormSchema>({
                      control,
                      name: "offices",
                    })}
                  </Card.Body>
                </Card.Root>
              </Box>
            </div>
            <br />
            <div className="text-right">
              <Button variant="solid" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default CompanyForm;
