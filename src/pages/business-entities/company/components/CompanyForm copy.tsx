import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumbs,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
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
    defaultValues : {
      status: "",
      ownership: "",
      company_type: "",
      company_name: "",
    }
  });

  const submitHandler = (data) => {
    console.log("Data",data);
  };
  const onError = (errors) => {
    console.error("Validation Errors", errors);
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/business-entities/companies" className="hover:underline">
          MUI
        </Link>
        <Typography sx={{ color: "text.primary" }}>Breadcrumbs</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 2, mt: 2 }}>
        <form onSubmit={handleSubmit(submitHandler, onError)} className="">
          <div >
            <Typography variant="h6" sx={{fontSize: "1.2rem", mb:1.5, mt:1}} >Primary Information</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Company Name</FormLabel>
                <Controller
                  name="company_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      size="small"
                      placeholder="Enter Company Name"
                      {...field}
                      error={!!errors?.company_name}
                      helperText={errors?.company_name?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth error={!!errors.status}>
                <FormLabel sx={{mb:0.5}}>Status</FormLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select id="Status" size="small" {...field}>
                      <MenuItem value=""  disabled>Select Status</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Disabled">Diabled</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors?.status?.message}</FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.ownership}>
                <FormLabel sx={{mb:0.5}}>Ownership Type</FormLabel>
                <Controller
                  name="ownership"
                  control={control}
                  render={({ field }) => (
                    <Select size="small" {...field}>
                      <MenuItem value="active">active</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors?.ownership?.message}</FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.company_type}>
                <FormLabel sx={{mb:0.5}}>Company Type</FormLabel>
                <Controller
                  name="company_type"
                  control={control}
                  render={({ field }) => (
                    <Select size="small"  {...field}>
                      <MenuItem value="Active">Active</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors?.company_type?.message}</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Owner Name</FormLabel>
                <Controller
                  name="owner"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Enter Owner Name"
                      {...field}
                      error={!!errors?.owner}
                      helperText={errors?.owner?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Establishment Year</FormLabel>
                <Controller
                  name="establishment_year"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="number"
                      size="small"
                      placeholder="Enter Establishment Year"
                      {...field}
                      error={!!errors?.establishment_year}
                      helperText={errors?.establishment_year?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Country</FormLabel>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Enter Country"
                      {...field}
                      error={!!errors?.country}
                      helperText={errors?.country?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>State</FormLabel>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Enter State"
                      {...field}
                      error={!!errors?.state}
                      helperText={errors?.state?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>City</FormLabel>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="e.g. Ahmedabad..."
                      {...field}
                      error={!!errors?.city}
                      helperText={errors?.city?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>State</FormLabel>
                <Controller
                  name="zip_postal_code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="number"
                      size="small"
                      placeholder="e.g. 350021..."
                      {...field}
                      error={!!errors?.zip_postal_code}
                      helperText={errors?.zip_postal_code?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Address</FormLabel>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Address"
                      multiline
                      {...field}
                      error={!!errors?.address}
                      helperText={errors?.address?.message}
                    />
                  )}
                />
              </FormControl>
            </div>
            <br />

            <Typography variant="h6" sx={{fontSize: "1.2rem", mb:1.5, mt:1}} >Contact Information</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Primary Email Address</FormLabel>
                <Controller
                  name="primary_email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="email"
                      size="small"
                      placeholder="e.g. xyz@gmail.com..."
                      {...field}
                      error={!!errors?.primary_email}
                      helperText={errors?.primary_email?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Alternate Email Address</FormLabel>
                <Controller
                  name="alternate_email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="email"
                      size="small"
                      placeholder="e.g. abc@gmail.com..."
                      {...field}
                      error={!!errors?.alternate_email}
                      helperText={errors?.alternate_email?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Notification Email</FormLabel>
                <Controller
                  name="notification_email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="email"
                      size="small"
                      placeholder="e.g. abc@gmail.com..."
                      {...field}
                      error={!!errors?.notification_email}
                      helperText={errors?.notification_email?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Primary Contact Number</FormLabel>
                <Controller
                  name="primary_contact_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="number"
                      size="small"
                      placeholder="Enter Contact Number"
                      {...field}
                      error={!!errors?.primary_contact_number}
                      helperText={errors?.primary_contact_number?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Alternate Contact Number</FormLabel>
                <Controller
                  name="alternate_contact_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="number"
                      size="small"
                      placeholder="Enter Alternate Contact Number"
                      {...field}
                      error={!!errors?.alternate_contact_number}
                      helperText={errors?.alternate_contact_number?.message}
                    />
                  )}
                />
              </FormControl>
            </div>
            <br />

            <Typography variant="h6" sx={{fontSize: "1.2rem", mb:1.5, mt:1}} >Business Details</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Primary Business Type</FormLabel>
                <Controller
                  name="primary_business_type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Enter Primary Business Type"
                      {...field}
                      error={!!errors?.primary_business_type}
                      helperText={errors?.primary_business_type?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Primary Business Category</FormLabel>
                <Controller
                  name="primary_business_category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Select Primary Business Category"
                      {...field}
                      error={!!errors?.primary_business_category}
                      helperText={errors?.primary_business_category?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Sub Category</FormLabel>
                <Controller
                  name="sub_category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Enter Sub Category"
                      {...field}
                      error={!!errors?.sub_category}
                      helperText={errors?.sub_category?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>PAN Number</FormLabel>
                <Controller
                  name="pan_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Enter PAN Number"
                      {...field}
                      error={!!errors?.pan_number}
                      helperText={errors?.pan_number?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>GST Number</FormLabel>
                <Controller
                  name="gst_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="Enter GST Number"
                      {...field}
                      error={!!errors?.gst_number}
                      helperText={errors?.gst_number?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>TRN Number</FormLabel>
                <Controller
                  name="trn_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="text"
                      size="small"
                      placeholder="TRN Number"
                      {...field}
                      error={!!errors?.trn_number}
                      helperText={errors?.trn_number?.message}
                    />
                  )}
                />
              </FormControl>
            </div>

            <Typography variant="h6" sx={{fontSize: "1.2rem", mb:1.5, mt:1}} >Documents</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>PAN Certificate</FormLabel>
                <Controller
                  name="pan_card"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="file"
                      size="small"
                      {...field}
                      error={!!errors?.pan_card}
                      helperText={errors?.pan_card?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>GST Certificate</FormLabel>
                <Controller
                  name="gst_certificate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="file"
                      size="small"
                      {...field}
                      error={!!errors?.gst_certificate}
                      helperText={errors?.gst_certificate?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel sx={{mb:0.5}}>Authority Letter</FormLabel>
                <Controller
                  name="authority_letter"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      type="file"
                      size="small"
                      {...field}
                      error={!!errors?.authority_letter}
                      helperText={errors?.authority_letter?.message}
                    />
                  )}
                />
              </FormControl>
            </div>  
          </div>
          <br />
          <div className="text-right">
            {/* <Button variant="contained" type="submit">Save</Button> */}
            <button type="submit">Save</button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default CompanyForm;
