import {
  Breadcrumb,
  Button,
  Card,
  Heading,
  Spinner,
  Tabs,
  Wrap,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";

import { Link } from "react-router-dom";
// import BankDetails from "./BankDetails";
// import Accessibility from "./Accessibility";
// import CompanyDetails from "./CompanyDetails";
// import KycDocuments from "./KycDocuments";
// import References from "./References";
import { lazy, Suspense } from "react";
import Loading from "@/components/ui/Loading";
import { useDispatch } from "react-redux";
import { createCompanyThunk } from "@/redux/thunks/businessEntitiesThunk";
import { objectToFormData } from "@/utils/objectToFormData";

const BankDetails = lazy(()=> import("./BankDetails"))
const Accessibility = lazy(()=> import("./Accessibility"))
const CompanyDetails = lazy(()=> import("./CompanyDetails"))
const KycDocuments = lazy(()=> import("./KycDocuments"))
const References = lazy(()=> import("./References"))

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
  status: z.string({ required_error: "Status is Required" }).trim(),
  company_name: z
    .string({ required_error: "Company Name is required" })
    .trim()
    .min(2, { message: "Name must be larger than 2 characters" }),
  owner_name: z.string().trim().optional(),
  ownership_type: z.string().trim().optional(),
  establishment_year: z.coerce.number().max(2025).nullable().optional(),
  industry: z.string().trim().optional(),
  business_category: z.string().trim().optional(),
  company_type: z.string().trim().optional(),
  company_website: z.string().trim().optional(),
  company_logo_url: fileSchema,
  primary_contact_no: z.coerce.number().nullable().optional(),
  primary_contact_no_code: z.coerce.number().nullable().optional(), // Made optional to avoid missing input issue
  alternate_contact_no: z.coerce.number().nullable().optional(),
  alternate_contact_no_code: z.coerce.number().nullable().optional(),
  primary_email: z
    .string()
    .trim()
    .min(1, { message: "Primary Email is required" }),
  alternate_email: z.string().trim().optional(),
  gst_number: z.string().trim().optional(),
  pan_number: z.string().trim().optional(),
  trn_number: z.string().trim().optional(),
  tan_number: z.string().trim().optional(),
  
  // sub_category: z.string().trim().optional(),
  interested_in: z.string().trim().optional(),
  kyc_verification: z
    .object({
      gst_certificate_file : fileSchema,
      gst_remark: z.string().trim().optional(),
      gst_verified: z.string().trim().optional(),
      pan_card_file : fileSchema,
      pan_card_remark: z.string().trim().optional(),
      pan_card_verified: z.string().trim().optional(),
      declaration_194q_file : fileSchema,
      declaration_194q_remark: z.string().trim().optional(),
      declaration_194q_verified: z.string().trim().optional(),
      authority_letter_file : fileSchema,
      authority_letter_remark: z.string().trim().optional(),
      authority_letter_verified: z.string().trim().optional(),
    }).optional().nullable() ,
  headOffice: z
    .object({
      officeName: z.string().trim().nullable().optional(),
      office_gst: z.string().trim().nullable().optional(),
      contact_person: z.string().trim().nullable().optional(),
      email: z.string().trim().nullable().optional(),
      phone: z.string().trim().nullable().optional(),
      country: z.string().trim().nullable().optional(),
      state: z.string().trim().nullable().optional(),
      city: z.string().trim().nullable().optional(),
      pincode: z.coerce.number().nullable().optional(),
      location: z.string().trim().nullable().optional(),
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
      z.object({
        account_number: z.coerce.number().nullable().optional(),
        account_type: z.string().trim().nullable().optional(),
        account_holder_name: z.string().trim().nullable().optional(),
        bank_name: z.string().trim().nullable().optional(),
        ifsc_code: z.string().trim().nullable().optional(),
        primary: z.boolean().nullable().optional(),
      })
    )
    .nullable()
    .optional(),
  reference: z
    .object({
      person_name: z.string().trim().nullable().optional(),
      designation: z.string().trim().nullable().optional(),
      company_name: z.string().trim().nullable().optional(),
      email: z.string().trim().nullable().optional(),
      phone: z.string().trim().nullable().optional(),
    })
    .nullable()
    .optional(),

  enableBilling: z.string().nullable().optional(),
  userAccess: z.string().nullable().optional(),
  billingDoc: z
  .array(
    z.object({
      doc_name: z.string().trim().nullable().optional(),
      doc_file: fileSchema,
    })
  )
  .nullable()
  .optional(),
    
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;

const CompanyForm = () => {
  const formMethods = useForm<CompanyFormSchema>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      establishment_year: null,
      zip_postal_code: null,
      primary_contact_number: null,
      primary_contact_number_code: null,
      alternate_contact_number: null,
      alternate_contact_country_code: null,
      offices: null,
      bank_details: [
        {
          account_number: null,
          account_holder_name: "",
          bank_name: "",
          ifsc_code: "",
          primary: true,
        },
      ],
      accessibility: {
        enableBilling: null,
        userAccess: null,
        billingDoc: null,
      },
    },
  });

  const { handleSubmit } = formMethods;
  const dispatch = useDispatch()
  const submitHandler = (data: CompanyFormSchema): void => {
    console.log("Data", data);
    const formData = objectToFormData(data)

    console.log("formdata", formData)
    dispatch(createCompanyThunk(formData))
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
        <FormProvider {...formMethods}>
          <Tabs.Root defaultValue="companyDetails" variant="enclosed">
            <Tabs.List width="full">
              <Tabs.Trigger value="companyDetails">Company Details</Tabs.Trigger>
              <Tabs.Trigger value="kycDocs">KYC Documents</Tabs.Trigger>
              <Tabs.Trigger value="bankDetails">Bank Details</Tabs.Trigger>
              <Tabs.Trigger value="references">References</Tabs.Trigger>
              <Tabs.Trigger value="accesibility">Accesibility</Tabs.Trigger>
              <Tabs.Trigger value="memberManagement">Member Management</Tabs.Trigger>
            </Tabs.List>

            {/* Company Details */}
            <Tabs.Content value="companyDetails">
              <Suspense fallback={<Loading/>}>
                <CompanyDetails />
              </Suspense>
            </Tabs.Content>

            {/* KYC Verification */}
            <Tabs.Content value="kycDocs">
               <Suspense fallback={<Loading/>}>
              <KycDocuments />
               </Suspense>
            </Tabs.Content>

            {/* Bank Details */}
            <Tabs.Content value="bankDetails">
               <Suspense fallback={<Loading/>}>
              <BankDetails />
               </Suspense>
            </Tabs.Content>

            {/* References */}
            <Tabs.Content value="references">
               <Suspense fallback={<Loading/>}>
              <References />
               </Suspense>
            </Tabs.Content>

            {/* Accessibility */}
            <Tabs.Content value="accesibility">
               <Suspense fallback={<Loading/>}>
              <Accessibility />
               </Suspense>
            </Tabs.Content>

            {/* Member Management */}
            <Tabs.Content value="memberManagement">
              <Card.Root>
                <Card.Body>
                  <Heading mb={4}>Member</Heading>
                </Card.Body>
              </Card.Root>
            </Tabs.Content>
          </Tabs.Root>
        </FormProvider>

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
