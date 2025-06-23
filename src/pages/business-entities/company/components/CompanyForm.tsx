import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const CompanyForm = () => {
  const companyFormSchema = z.object({
    company_name: z
      .string({ required_error: "Company Name is required" })
      .trim()
      .min(2, { message: "Name must be larger than 2 characters" }),
    ownership: z.string().trim().optional(),
    owner: z.string().trim().optional(),
    establishment_year: z.number().optional(),
    company_type: z.string().trim().optional(),
    company_website: z.string().trim().optional(),
    company_logo_brochure: z.string().trim().optional(),
    status: z
      .string({ required_error: "Please choose a status" })
      .min(1, { message: "Status is required" }),
    country: z.string().trim().optional(),
    state: z.string().trim().optional(),
    city: z.string().trim().optional(),
    zip_postal_code: z.number().optional(),
    address: z.string().trim().optional(),
    primary_contact_number: z.number().optional(),
    primary_contact_number_code: z.number().optional(), // Made optional to avoid missing input issue
    alternate_contact_number: z.number().optional(),
    alternate_contact_country_code: z.number().optional(),
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
      .any()
      .optional()
      .refine((val) => val === undefined || val instanceof File, {
        message: "GST Certificate must be a file or empty",
      }),
    aadhar_card: z
      .any()
      .optional()
      .refine((val) => val === undefined || val instanceof File, {
        message: "Aadhar Card must be a file or empty",
      }),
    pan_card: z
      .any()
      .optional()
      .refine((val) => val === undefined || val instanceof File, {
        message: "PAN Card must be a file or empty",
      }),
    authority_letter: z
      .any()
      .optional()
      .refine((val) => val === undefined || val instanceof File, {
        message: "Authority Letter must be a file or empty",
      }),
    primary_account_number: z.string().trim().optional(),
    primary_ifsc_code: z.string().trim().optional(),
    primary_bank_name: z.string().trim().optional(),
    primary_bank_verification_photo: z
      .any()
      .optional()
      .refine((val) => val === undefined || val instanceof File, {
        message: "Bank Verification Photo must be a file or empty",
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      status: "",
      ownership: "",
      company_type: "",
      company_name: "",
    },
  });

  const submitHandler = (data) => {
    console.log("Data", data);
  };
  const onError = (errors) => {
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

      <Box>
        <form onSubmit={handleSubmit(submitHandler, onError)} className="">
          <div>
            <Heading mb={4}>Primary Information</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <Field.Root invalid={!!errors?.company_name}>
                <Field.Label>Company Name</Field.Label>
                <Controller
                  name="company_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter Company Name"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.company_name?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.status}>
                <Field.Label>Status</Field.Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <NativeSelect.Root>
                      <NativeSelect.Field {...field}>
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Disabled">Diabled</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  )}
                />
                <Field.ErrorText>{errors?.status?.message}</Field.ErrorText>
              </Field.Root>
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
                <Field.ErrorText>{errors?.ownership?.message}</Field.ErrorText>
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
              <Field.Root invalid={!!errors?.owner}>
                <Field.Label>Owner Name</Field.Label>
                <Controller
                  name="owner"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter Owner Name"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>{errors?.owner?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.establishment_year}>
                <Field.Label>Establishment Year</Field.Label>
                <Controller
                  name="establishment_year"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Enter Establishment Year"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.establishment_year?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.country}>
                <Field.Label>Country</Field.Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" placeholder="Enter Country" {...field} />
                  )}
                />
                <Field.ErrorText>{errors?.country?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.state}>
                <Field.Label>State</Field.Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" placeholder="Enter State" {...field} />
                  )}
                />
                <Field.ErrorText>{errors?.state?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.city}>
                <Field.Label>City</Field.Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="e.g. Ahmedabad..."
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>{errors?.city?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.zip_postal_code}>
                <Field.Label>State</Field.Label>
                <Controller
                  name="zip_postal_code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="e.g. 350021..."
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.zip_postal_code?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.address}>
                <Field.Label>Address</Field.Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" placeholder="Address" {...field} />
                  )}
                />
                <Field.ErrorText>{errors?.address?.message}</Field.ErrorText>
              </Field.Root>
            </div>
            <br />

            <Heading mb={4}>Contact Information</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <Field.Root invalid={!!errors?.primary_email}>
                <Field.Label>Primary Email Address</Field.Label>
                <Controller
                  name="primary_email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="e.g. xyz@gmail.com..."
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.primary_email?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.alternate_email}>
                <Field.Label>Alternate Email Address</Field.Label>
                <Controller
                  name="alternate_email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="e.g. abc@gmail.com..."
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.alternate_email?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.notification_email}>
                <Field.Label>Notification Email</Field.Label>
                <Controller
                  name="notification_email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="e.g. abc@gmail.com..."
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.notification_email?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.primary_contact_number}>
                <Field.Label>Primary Contact Number</Field.Label>
                <Controller
                  name="primary_contact_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Enter Contact Number"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.primary_contact_number?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.alternate_contact_number}>
                <Field.Label>Alternate Contact Number</Field.Label>
                <Controller
                  name="alternate_contact_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Enter Alternate Contact Number"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.alternate_contact_number?.message}
                </Field.ErrorText>
              </Field.Root>
            </div>
            <br />

            <Heading mb={4} style={{ fontSize: "1.2rem" }}>
              Business Details
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <Field.Root invalid={!!errors?.primary_business_type}>
                <Field.Label>Primary Business Type</Field.Label>
                <Controller
                  name="primary_business_type"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter Primary Business Type"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.primary_business_type?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.primary_business_category}>
                <Field.Label>Primary Business Category</Field.Label>
                <Controller
                  name="primary_business_category"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Select Primary Business Category"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.primary_business_category?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.sub_category}>
                <Field.Label>Sub Category</Field.Label>
                <Controller
                  name="sub_category"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter Sub Category"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors?.sub_category?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.pan_number}>
                <Field.Label>PAN Number</Field.Label>
                <Controller
                  name="pan_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter PAN Number"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>{errors?.pan_number?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.gst_number}>
                <Field.Label>GST Number</Field.Label>
                <Controller
                  name="gst_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter GST Number"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>{errors?.gst_number?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.trn_number}>
                <Field.Label>TRN Number</Field.Label>
                <Controller
                  name="trn_number"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" placeholder="TRN Number" {...field} />
                  )}
                />
                <Field.ErrorText>{errors?.trn_number?.message}</Field.ErrorText>
              </Field.Root>
            </div>
            <br />

            <Heading mb={4}>Documents</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <Field.Root invalid={!!errors?.pan_card}>
                <Field.Label>PAN Certificate</Field.Label>
                <Controller
                  name="pan_card"
                  control={control}
                  render={({ field }) => <Input type="file" {...field} />}
                />
                <Field.ErrorText>{errors?.pan_card?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.gst_certificate}>
                <Field.Label>GST Certificate</Field.Label>
                <Controller
                  name="gst_certificate"
                  control={control}
                  render={({ field }) => <Input type="file" {...field} />}
                />
                <Field.ErrorText>
                  {errors?.gst_certificate?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors?.authority_letter}>
                <Field.Label>Authority Letter</Field.Label>
                <Controller
                  name="authority_letter"
                  control={control}
                  render={({ field }) => <Input type="file" {...field} />}
                />
                <Field.ErrorText>
                  {errors?.authority_letter?.message}
                </Field.ErrorText>
              </Field.Root>
            </div>
          </div>
          <br />
          <div className="text-right">
            <Button variant="solid" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CompanyForm;
