import {
  renderInput,
  renderInputFile,
  renderSelect,
} from "@/components/ui/form/formInput";
import {
  Box,
  Breadcrumb,
  Button,
  Card,
  Heading,
  Separator,
  Table,
  Tabs,
  Wrap,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { officeTypes } from "./OfficeLocation";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
import { bankDetails } from "./bankDetails";

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
    establishment_year: z.coerce.number().max(2025).nullable().optional(),
    company_type: z.string().trim().optional(),
    company_website: z.string().trim().optional(),
    company_logo_brochure: z.string().trim().optional(),
    status: z.string({ required_error: "Status is Required" }).trim(),
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
    kyc_verification: z
      .object({
        gst_certificate: z
          .object({
            file: fileSchema,
            remark: z.string().trim().optional(),
            verified: z.string().trim().optional(),
          })
          .nullable()
          .optional(),
        "194Q_declaration": z
          .object({
            file: fileSchema,
            remark: z.string().trim().optional(),
            verified: z.string().trim().optional(),
          })
          .nullable()
          .optional(),
        pan_card: z
          .object({
            file: fileSchema,
            remark: z.string().trim().optional(),
            verified: z.string().trim().optional(),
          })
          .nullable()
          .optional(),
        authority_letter: z
          .object({
            file: fileSchema,
            remark: z.string().trim().optional(),
            verified: z.string().trim().optional(),
          })
          .nullable()
          .optional(),
      })
      .nullable()
      .optional(),
    headOffice: z
      .object({
        officeName: z.string().trim().nullable().optional(),
        office_gst: z.string().trim().nullable().optional(),
        contact_person: z.string().trim().nullable().optional(),
        email: z.string().trim().nullable().optional(),
        phone: z.string().trim().nullable().optional(),
        address: z
          .object({
            country: z.string().trim().nullable().optional(),
            state: z.string().trim().nullable().optional(),
            city: z.string().trim().nullable().optional(),
            pincode: z.coerce.number().nullable().optional(),
            location: z.string().trim().nullable().optional(),
          })
          .nullable()
          .optional(),
      })
      .nullable()
      .optional(),
    offices: z
      .array(
        z.object({
          officeType: z.string().trim().nullable(),
          officeName: z.string().trim().nullable().optional(),
          office_gst: z.string().trim().nullable().optional(),
          contact_person: z.string().trim().nullable().optional(),
          email: z.string().trim().nullable().optional(),
          phone: z.string().trim().nullable().optional(),
          address: z
            .object({
              country: z.string().trim().nullable(),
              state: z.string().trim().nullable(),
              city: z.string().trim().nullable(),
              pincode: z.coerce.number().nullable().optional(),
              location: z.string().trim().nullable().optional(),
            })
            .nullable()
            .optional(),
        })
      )
      .nullable()
      .optional(),

    bank_details: z
      .array(
        z
          .object({
            account_number: z.coerce.number().nullable().optional(),
            account_holder_name: z.string().trim().nullable().optional(),
            bank_name: z.string().trim().nullable().optional(),
            ifsc_code: z.string().trim().nullable().optional(),
            primary: z.boolean().nullable().optional(),
          })
          .optional()
      )
      .nullable()
      .optional(),
  });

  type CompanyFormSchema = z.infer<typeof companyFormSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormSchema>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      establishment_year: null,
      zip_postal_code: null,
      primary_contact_number: null,
      primary_contact_number_code: null,
      alternate_contact_number: null,
      alternate_contact_country_code: null,
      offices: null,
    },
  });

  const [isMobile] = useMediaQuery(["(max-width: 767px)"]);
  const submitHandler = (data: CompanyFormSchema) => {
    console.log("Data", data);
  };
  const onError = (errors: FieldErrors<CompanyFormSchema>) => {
    console.error("Validation Errors", errors);
  };

  return (
    <div>
      <Breadcrumb.Root fontWeight={500} colorPalette="blue" mb={2}>
        <Breadcrumb.List>
          <Breadcrumb.Item
            _hover={{
              textDecoration: "underline",
            }}
          >
            {/* <Breadcrumb.Link href="/business-entities/companies">Company</Breadcrumb.Link> */}
            <Link to="/business-entities/companies">Companies</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink color="primary.500">
              Add New Company
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <form onSubmit={handleSubmit(submitHandler, onError)}>
        <Tabs.Root defaultValue="companyDetails" variant="enclosed">
          <Tabs.List width="full">
            <Tabs.Trigger value="companyDetails">Company Details</Tabs.Trigger>
            <Tabs.Trigger value="kycDocs">KYC Documents</Tabs.Trigger>
            <Tabs.Trigger value="bankDetails">Bank Details</Tabs.Trigger>
            <Tabs.Trigger value="references">References</Tabs.Trigger>
            <Tabs.Trigger value="accesibility">Accesibility</Tabs.Trigger>
            <Tabs.Trigger value="memberManagement">
              Member Management
            </Tabs.Trigger>
          </Tabs.List>

          {/* Company Details */}
          <Tabs.Content
            value="companyDetails"
            _open={{
              animationName: "fade-in",
              animationDuration: "300ms",
            }}
            _closed={{
              animationName: "fade-out",
              animationDuration: "120ms",
            }}
          >
            <Card.Root>
              <Card.Body shadow="xl" borderRadius="md">
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
                  <Box>
                    <Heading mb={4}>Office Information</Heading>

                    <Box position="relative">
                      <Heading size="md" mb={2}>
                        Head Office
                      </Heading>
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
                  </Box>
                </div>
              </Card.Body>
            </Card.Root>
          </Tabs.Content>

          {/* KYC Verification */}
          <Tabs.Content
            value="kycDocs"
            _open={{
              animationName: "fade-in",
              animationDuration: "300ms",
            }}
            _closed={{
              animationName: "fade-out",
              animationDuration: "120ms",
            }}
          >
            <Card.Root>
              <Card.Body>
                <Heading mb={4}>KYC Documents</Heading>

                {isMobile ? (
                  <div>
                    <div className="">
                      {renderInputFile<CompanyFormSchema>({
                        fieldName: "kyc_verification.pan_card.file",
                        label: "PAN Certificate",
                        control,
                        errors,
                      })}
                      {renderInput<CompanyFormSchema>({
                        fieldName: "kyc_verification.pan_card.remark",
                        placeholder: "Enter Remark",
                        control,
                        errors,
                      })}
                      {renderSelect<CompanyFormSchema>({
                        fieldName: "kyc_verification.pan_card.verified",
                        options: [
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" },
                        ],
                        placeholder: "Select Yes or No",
                        control,
                        errors,
                      })}
                    </div>

                    <div>
                      {renderInputFile<CompanyFormSchema>({
                        fieldName: "kyc_verification.gst_certificate.file",
                        label: "GST Certificate",
                        control,
                        errors,
                      })}
                      {renderInput<CompanyFormSchema>({
                        fieldName: "kyc_verification.gst_certificate.remark",
                        placeholder: "Enter Remark",
                        control,
                        errors,
                      })}
                      {renderSelect<CompanyFormSchema>({
                        fieldName: "kyc_verification.gst_certificate.verified",
                        options: [
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" },
                        ],
                        placeholder: "Select Yes or No",
                        control,
                        errors,
                      })}
                    </div>

                    <div>
                      {renderInputFile<CompanyFormSchema>({
                        fieldName: "kyc_verification.authority_letter.file",
                        label: "Authority Letter",
                        control,
                        errors,
                      })}
                      {renderInput<CompanyFormSchema>({
                        fieldName: "kyc_verification.authority_letter.remark",
                        placeholder: "Enter Remark",
                        control,
                        errors,
                      })}
                      {renderSelect<CompanyFormSchema>({
                        fieldName: "kyc_verification.authority_letter.verified",
                        options: [
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" },
                        ],
                        placeholder: "Select Yes or No",
                        control,
                        errors,
                      })}
                    </div>

                    <div>
                      {renderInputFile<CompanyFormSchema>({
                        fieldName: "kyc_verification.194Q_declaration.file",
                        label: "194Q Declaration",
                        control,
                        errors,
                      })}
                      {renderInput<CompanyFormSchema>({
                        fieldName: "kyc_verification.194Q_declaration.remark",
                        placeholder: "Enter Remark",
                        control,
                        errors,
                      })}
                      {renderSelect<CompanyFormSchema>({
                        fieldName: "kyc_verification.194Q_declaration.verified",
                        options: [
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" },
                        ],
                        placeholder: "Select Yes or No",
                        control,
                        errors,
                      })}
                    </div>
                  </div>
                ) : (
                  <Table.Root size="md" variant="outline" showColumnBorder>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Documents</Table.ColumnHeader>
                        <Table.ColumnHeader width="25%">
                          Upload File
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Remark</Table.ColumnHeader>
                        <Table.ColumnHeader>Verified</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>PAN Card</Table.Cell>
                        <Table.Cell>
                          {renderInputFile<CompanyFormSchema>({
                            fieldName: "kyc_verification.pan_card.file",
                            // label: "PAN Certificate",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderInput<CompanyFormSchema>({
                            fieldName: "kyc_verification.pan_card.remark",
                            placeholder: "Enter Remark",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderSelect<CompanyFormSchema>({
                            fieldName: "kyc_verification.pan_card.verified",
                            options: [
                              { label: "Yes", value: "Yes" },
                              { label: "No", value: "No" },
                            ],
                            placeholder: "Select Yes or No",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>GST Certificate</Table.Cell>
                        <Table.Cell>
                          {renderInputFile<CompanyFormSchema>({
                            fieldName: "kyc_verification.gst_certificate.file",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderInput<CompanyFormSchema>({
                            fieldName:
                              "kyc_verification.gst_certificate.remark",
                            placeholder: "Enter Remark",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderSelect<CompanyFormSchema>({
                            fieldName:
                              "kyc_verification.gst_certificate.verified",
                            options: [
                              { label: "Yes", value: "Yes" },
                              { label: "No", value: "No" },
                            ],
                            placeholder: "Select Yes or No",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Authority Letter</Table.Cell>
                        <Table.Cell>
                          {renderInputFile<CompanyFormSchema>({
                            fieldName: "kyc_verification.authority_letter.file",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderInput<CompanyFormSchema>({
                            fieldName:
                              "kyc_verification.authority_letter.remark",
                            placeholder: "Enter Remark",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderSelect<CompanyFormSchema>({
                            fieldName:
                              "kyc_verification.authority_letter.verified",
                            options: [
                              { label: "Yes", value: "Yes" },
                              { label: "No", value: "No" },
                            ],
                            placeholder: "Select Yes or No",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>194Q Declaration</Table.Cell>
                        <Table.Cell>
                          {renderInputFile<CompanyFormSchema>({
                            fieldName: "kyc_verification.194Q_declaration.file",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderInput<CompanyFormSchema>({
                            fieldName:
                              "kyc_verification.194Q_declaration.remark",
                            placeholder: "Enter Remark",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                        <Table.Cell>
                          {renderSelect<CompanyFormSchema>({
                            fieldName:
                              "kyc_verification.194Q_declaration.verified",
                            options: [
                              { label: "Yes", value: "Yes" },
                              { label: "No", value: "No" },
                            ],
                            placeholder: "Select Yes or No",
                            control,
                            errors,
                          })}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table.Root>
                )}
              </Card.Body>
            </Card.Root>
          </Tabs.Content>

          {/* Bank Details */}
          <Tabs.Content
            value="bankDetails"
            _open={{
              animationName: "fade-in",
              animationDuration: "300ms",
            }}
            _closed={{
              animationName: "fade-out",
              animationDuration: "120ms",
            }}
          >
            <Card.Root>
              <Card.Body>
                <Heading mb={4}>Bank Details</Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                  {renderInput<CompanyFormSchema>({
                    fieldName: "bank_details[0].account_number",
                    label: "Account Number",
                    placeholder: "Enter Acount Number",
                    control,
                    errors,
                    inputType: "number"
                  })}
                  {renderInput<CompanyFormSchema>({
                    fieldName: "bank_details[0].account_holder_name",
                    label: "Account Holder Name",
                    placeholder: "e.g. Nitesh Verma",
                    control,
                    errors,
                  })}
                  {renderInput<CompanyFormSchema>({
                    fieldName: "bank_details[0].bank_name",
                    label: "Bank Name",
                    placeholder: "Enter Bank Name",
                    control,
                    errors,
                  })}
                  {renderInput<CompanyFormSchema>({
                    fieldName: "bank_details[0].ifsc_code",
                    label: "IFSC Code",
                    placeholder: "Enter IFSC Code",
                    control,
                    errors,
                  })}
                </div>

                <br />
                <Separator/>
                <br />
                {
                  bankDetails<CompanyFormSchema>({name: "bank_details", control})
                }
                  
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content
            value="references"
            _open={{
              animationName: "fade-in",
              animationDuration: "300ms",
            }}
            _closed={{
              animationName: "fade-out",
              animationDuration: "120ms",
            }}
          >
            <Card.Root>
              <Card.Body>
                <Heading mb={4}>References</Heading>
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content
            value="accesibility"
            _open={{
              animationName: "fade-in",
              animationDuration: "300ms",
            }}
            _closed={{
              animationName: "fade-out",
              animationDuration: "120ms",
            }}
          >
            <Card.Root>
              <Card.Body>
                <Heading mb={4}>Accesibility</Heading>
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content
            value="memberManagement"
            _open={{
              animationName: "fade-in",
              animationDuration: "300ms",
            }}
            _closed={{
              animationName: "fade-out",
              animationDuration: "120ms",
            }}
          >
            <Card.Root>
              <Card.Body>
                <Heading mb={4}>Member</Heading>
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>

        <Card.Root mt={2}>
          <Card.Body shadow="xl" borderRadius="md">
            <Wrap justifyContent="end">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save</Button>
            </Wrap>
          </Card.Body>
        </Card.Root>
      </form>
    </div>
  );
};

export default CompanyForm;
