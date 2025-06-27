import { UiSelect, type SelectOptionsType } from "@/components/ui/UISelect";
import {
  Button,
  Card,
  Field,
  FileUpload,
  Heading,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import { z } from "zod";

const CompanyForm = () => {
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
    gst_certificate: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file.size <= 3_000_000, {
        message: "File size must be less than 3MB",
      })
      .refine((file) => !file || file.type === "application/pdf", {
        message: "File must be a PDF",
      }),
    aadhar_card: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file.size <= 3_000_000, {
        message: "File size must be less than 3MB",
      })
      .refine((file) => !file || file.type === "application/pdf", {
        message: "File must be a PDF",
      }),
    pan_card: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file.size <= 3_000_000, {
        message: "File size must be less than 3MB",
      })
      .refine((file) => !file || file.type === "application/pdf", {
        message: "File must be a PDF",
      }),

    authority_letter: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file.size <= 3_000_000, {
        message: "File size must be less than 3MB",
      })
      .refine((file) => !file || file.type === "application/pdf", {
        message: "File must be a PDF",
      }),

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
      aadhar_card: null,
      pan_card: null,
      authority_letter: null,
      primary_account_number: "",
      primary_ifsc_code: "",
      primary_bank_name: "",
    },
  });

  const renderInput = (
    fieldName: keyof CompanyFormSchema,
    label: string,
    placeholder: string,
    control: Control<CompanyFormSchema>,
    errors: FieldErrors<CompanyFormSchema>,
    inputType: string = "text"
  ) => {
    return (
      <Field.Root invalid={!!errors?.[fieldName]}>
        <Field.Label>{label}</Field.Label>
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => {
            return (
              <Input
                type={inputType}
                placeholder={placeholder}
                {...field}
                value={field.value as number | string | null ?? ""}
              />
            );
          }}
        />
        <Field.ErrorText>
          {typeof errors?.[fieldName]?.message === "string"
            ? errors[fieldName]?.message
            : ""}
        </Field.ErrorText>
      </Field.Root>
    );
  };
  const renderSelect = (
    fieldName: keyof CompanyFormSchema,
    label: string,
    placeholder: string,
    options: SelectOptionsType[],
    control: Control<CompanyFormSchema>,
    errors: FieldErrors<CompanyFormSchema>
  ) => {
    return (
      <Field.Root invalid={!!errors?.[fieldName]}>
        <Field.Label>{label}</Field.Label>
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => {
            return (
              <UiSelect
                {...field}
                value={options.find(
                  (opt) =>
                    opt.value === (field.value as SelectOptionsType)?.value
                )}
                isClearable
                onChange={(val) => field.onChange(val)}
                placeholder={placeholder}
                options={options}
              />
            );
          }}
        />
        <Field.ErrorText>
          {typeof errors?.[fieldName]?.message === "string"
            ? errors[fieldName]?.message
            : ""}
        </Field.ErrorText>
      </Field.Root>
    );
  };
  const renderInputFile = (
    fieldName: keyof CompanyFormSchema,
    label: string,
    control: Control<CompanyFormSchema>,
    errors: FieldErrors<CompanyFormSchema>
  ) => {
    return (
      <Field.Root invalid={!!errors?.[fieldName]}>
        <Field.Label>{label}</Field.Label>
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <FileUpload.Root>
              <FileUpload.HiddenInput
                onChange={(e) => field.onChange(e.target?.files?.[0])}
              />
              <Input asChild>
                <FileUpload.Trigger>
                  <FileUpload.FileText />
                </FileUpload.Trigger>
              </Input>
            </FileUpload.Root>
          )}
        />
        <Field.ErrorText>
          {typeof errors?.[fieldName]?.message === "string"
            ? errors[fieldName]?.message
            : ""}
        </Field.ErrorText>
      </Field.Root>
    );
  };

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {renderInput(
                  "company_name",
                  "Company Name",
                  "e.g. Acme Communication",
                  control,
                  errors
                )}
                {renderSelect(
                  "status",
                  "Status",
                  "Select Status",
                  [
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                  ],
                  control,
                  errors
                )}

                <Field.Root invalid={!!errors?.ownership}>
                  <Field.Label>Ownership Type</Field.Label>
                  <Controller
                    name="ownership"
                    control={control}
                    render={({ field }) => (
                      <NativeSelect.Root>
                        <NativeSelect.Field {...field}>
                          <option value="" disabled>
                            Select Status
                          </option>
                          <option value="active">Active</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  />
                  <Field.ErrorText>
                    {errors?.ownership?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors?.company_type}>
                  <Field.Label>Company Type</Field.Label>
                  <Controller
                    name="company_type"
                    control={control}
                    render={({ field }) => (
                      <NativeSelect.Root>
                        <NativeSelect.Field {...field}>
                          <option value="" disabled>
                            Select Status
                          </option>
                          <option value="active">Active</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  />
                  <Field.ErrorText>
                    {errors?.company_type?.message}
                  </Field.ErrorText>
                </Field.Root>
                {renderInput(
                  "owner",
                  "Owner Name",
                  "Enter Owner Name",
                  control,
                  errors
                )}
                {renderInput(
                  "establishment_year",
                  "Establishment Year",
                  "Enter Establishemnt Year",
                  control,
                  errors,
                  "number"
                )}
                {renderInput(
                  "country",
                  "Country",
                  "Enter Country",
                  control,
                  errors
                )}
                {renderInput("state", "State", "Enter State", control, errors)}
                {renderInput("city", "City", "Enter City", control, errors)}
                {renderInput(
                  "zip_postal_code",
                  "Zip/Postal Code",
                  "e.g. 350021...",
                  control,
                  errors,
                  "number"
                )}
                <div className="md:col-span-2">
                  {renderInput(
                    "address",
                    "Address",
                    "Enter Address",
                    control,
                    errors
                  )}
                </div>
              </div>
              <br />

              <Heading mb={4}>Contact Information</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {renderInput(
                  "primary_email",
                  "Primary Email Address",
                  "e.g. xyz@gmail.com...",
                  control,
                  errors,
                  "email"
                )}
                {renderInput(
                  "alternate_email",
                  "Alternate Email Address",
                  "e.g. abc@gmail.com...",
                  control,
                  errors,
                  "email"
                )}
                {renderInput(
                  "notification_email",
                  "Notification Email",
                  "e.g. abc@gmail.com...",
                  control,
                  errors,
                  "email"
                )}
                {renderInput(
                  "primary_contact_number",
                  "Primary Contact Number",
                  "Enter Contact Number",
                  control,
                  errors,
                  "number"
                )}
                {renderInput(
                  "alternate_contact_number",
                  "Alternate Contact Number",
                  "Enter Alternate Contact Number",
                  control,
                  errors,
                  "number"
                )}
              </div>
              <br />

              <Heading mb={4} style={{ fontSize: "1.2rem" }}>
                Business Details
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {renderInput(
                  "primary_business_type",
                  "Primary Business Type",
                  "Enter Primary Business Type",
                  control,
                  errors
                )}
                {renderInput(
                  "primary_business_category",
                  "Primary Business Category",
                  "Enter Primary Business Category",
                  control,
                  errors
                )}
                {renderInput(
                  "sub_category",
                  "Sub Category",
                  "Enter Sub Category",
                  control,
                  errors
                )}
                {renderInput(
                  "pan_number",
                  "PAN Number",
                  "Enter PAN Number",
                  control,
                  errors
                )}
                {renderInput(
                  "gst_number",
                  "GST Number",
                  "Enter GST Number",
                  control,
                  errors
                )}
                {renderInput(
                  "trn_number",
                  "TRN Number",
                  "Enter TRN Number",
                  control,
                  errors
                )}
              </div>
              <br />

              <Heading mb={4}>Documents</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {renderInputFile(
                  "pan_card",
                  "PAN Certificate",
                  control,
                  errors
                )}
                {renderInputFile(
                  "gst_certificate",
                  "GST Certificate",
                  control,
                  errors
                )}
                {renderInputFile(
                  "authority_letter",
                  "Authority Letter",
                  control,
                  errors
                )}
              </div>
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
