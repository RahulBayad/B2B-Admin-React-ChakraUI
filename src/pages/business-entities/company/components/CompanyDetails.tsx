import {
  Box,
  Button,
  Card,
  
  Heading,
  IconButton,
  Separator,
} from "@chakra-ui/react";
import type { CompanyFormSchema } from "./CreateCompany";
import {

  useFieldArray,
  useFormContext,
  useWatch,
  type ArrayPath,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  renderInput,
  renderInputFile,
  renderSelect,
} from "@/components/ui/form/formInput";
import { Plus, Trash } from "lucide-react";
import { Country, State, City } from "country-state-city";
import { useMemo } from "react";

export const officeTypes = <T extends FieldValues>({
  name,
  control,
}: {
  name: ArrayPath<T>;
  control: Control<T>;
}) => {
  const newOffice = {
    officeType: "",
    officeName: "",
    office_gst: "",
    contact_person: "",
    email: "",
    phone: "",
    address: {
      country: "",
      state: "",
      city: "",
      pincode: null,
      location: "",
    },
  };

  const { append, remove, fields } = useFieldArray({
    control,
    name,
  });

  return (
    <Box>
      <Box>
        {fields.map((field, index) => {
          return (
            <Box position="relative">
              <Box mb={2} className="flex justify-between items-center">
                <Heading size="md">Office {index + 1}</Heading>
                <IconButton
                  size="xs"
                  variant="outline"
                  borderColor="red.400"
                  colorPalette="red"
                  px={2}
                  bgColor=""
                  color="red.500"
                  _hover={{ bgColor: "red.500", color: "white" }}
                  onClick={() => remove(index)}
                >
                  <Trash /> Remove
                </IconButton>
              </Box>
              <Box
                key={field.id}
                borderWidth={1}
                p={4}
                className="relative rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {renderSelect<T>({
                  fieldName: `offices.${index}.officeType` as FieldPath<T>,
                  label: "Office Name",
                  options: [
                    { label: "Branch", value: "Branch" },
                    { label: "Warehouse", value: "Warehouse" },
                    { label: "Franchise", value: "Franchise" },
                    { label: "Other", value: "Other" },
                  ],
                  control: control,
                  placeholder: "Select Office Type",
                })}
                {renderInput<T>({
                  fieldName: `offices.${index}.officeName` as FieldPath<T>,
                  label: "Office Name",
                  control: control,
                  placeholder: "Enter Office Name",
                })}
                {renderInput<T>({
                  fieldName: `offices.${index}.office_gst` as FieldPath<T>,
                  label: "GST/REG. Number",
                  control: control,
                  placeholder: "Enter Office Name",
                })}
                {renderInput<T>({
                  fieldName: `offices.${index}.contact_person` as FieldPath<T>,
                  label: "Contact Person",
                  control: control,
                  placeholder: "Enter Office Name",
                })}
                {renderInput<T>({
                  fieldName: `offices.${index}.email` as FieldPath<T>,
                  label: "Email Address",
                  control: control,
                  placeholder: "Enter Office Name",
                  inputType: "email",
                })}
                {renderInput<T>({
                  fieldName: `offices.${index}.phone` as FieldPath<T>,
                  label: "Contact Number",
                  control: control,
                  placeholder: "Contact Number",
                  inputType: "number",
                })}
                {renderSelect<T>({
                  fieldName: `offices.${index}.address.country` as FieldPath<T>,
                  label: "Country",
                  options: [
                    { label: "India", value: "India" },
                    { label: "Nepal", value: "Nepal" },
                  ],
                  control: control,
                  placeholder: "Select Country",
                })}
                {renderSelect<T>({
                  fieldName: `offices.${index}.address.state` as FieldPath<T>,
                  label: "State",
                  options: [
                    { label: "Gujarat", value: "Gujarat" },
                    { label: "Rajasthan", value: "Rajasthan" },
                  ],
                  control: control,
                  placeholder: "Select State",
                })}
                {renderSelect<T>({
                  fieldName: `offices.${index}.address.city` as FieldPath<T>,
                  label: "City",
                  options: [
                    { label: "Ahmedabad", value: "Ahmedabad" },
                    { label: "Gandhinagar", value: "Gandhinagar" },
                  ],
                  control: control,
                  placeholder: "Select City",
                })}
                {renderInput<T>({
                  fieldName: `offices.${index}.address.pincode` as FieldPath<T>,
                  label: "Zip/Postal Code",
                  control: control,
                  placeholder: "e.g. 680291...",
                  inputType: "number",
                })}
                {renderInput<T>({
                  fieldName:
                    `offices.${index}.address.location` as FieldPath<T>,
                  label: "Location",
                  control: control,
                  placeholder: "e.g. 70/703, Keshav Apartments...",
                })}
              </Box>
              <br />
            </Box>
          );
        })}
      </Box>
      <div className="text-right">
        <Button
          variant="solid"
          size="sm"
          onClick={() => append(newOffice as any)}
        >
          <Plus /> Add Office
        </Button>
      </div>
    </Box>
  );
};

const CompanyDetails = () => {
  const { control } = useFormContext<CompanyFormSchema>();
  const countries = useMemo(() => Country.getAllCountries(), []);
  const countriesOptions = useMemo(
    () =>
      countries.map((country) => {
        return { label: country.name, value: country.name };
      }),
    []
  );

  const selectedCountry = useWatch({ control, name: "country" });
  const selectedState = useWatch({ control, name: "state" });

  const selectedCountryCode = useMemo(
    () =>
      countries.find((country) => country.name === selectedCountry)?.isoCode,
    [selectedCountry]
  );

  const statesOfSelectedCountry = useMemo(
    () =>
      selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : [],
    [selectedCountryCode]
  );

  const stateOptions = useMemo(
    () =>
      statesOfSelectedCountry.map((country) => {
        return { label: country.name, value: country.name };
      }),
    [statesOfSelectedCountry]
  );

  const selectedStateCode = useMemo(
    () =>
      statesOfSelectedCountry.find((val) => val.name === selectedState)
        ?.isoCode,
    [statesOfSelectedCountry, selectedState]
  );

  const cityOfSelectedState = useMemo(
    () => City.getCitiesOfState(selectedCountryCode as any, selectedStateCode as any),
    [selectedCountryCode, selectedStateCode]
  );

  const cityOptions = useMemo(
    () =>
      cityOfSelectedState.map((country) => {
        return { label: country.name, value: country.name };
      }),
    [cityOfSelectedState]
  );

  return (
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
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "owner",
              label: "Owner Name",
              placeholder: "Enter Owner Name",
              control,
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "establishment_year",
              label: "Establishment Year",
              placeholder: "Enter Establishment Year",
              inputType: "number",
              control,
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
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "company_website",
              label: "Company Website (URL)",
              placeholder: "Enter Company Website",
              control,
            })}

            {renderInputFile<CompanyFormSchema>({
              fieldName: "company_logo_brochure",
              label: "Company Logo (URL)",
              control,
            })}

            {renderSelect<CompanyFormSchema>({
              fieldName: "country",
              label: "Country",
              placeholder: "Select Country",
              options: countriesOptions,
              control,
            })}

            {renderSelect<CompanyFormSchema>({
              fieldName: "state",
              label: "State",
              placeholder: "Select State",
              options: stateOptions,
              control,
            })}

            {renderSelect<CompanyFormSchema>({
              fieldName: "city",
              label: "City",
              placeholder: "Select City",
              options: cityOptions,
              control,
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "zip_postal_code",
              label: "Zip/Postal Code",
              placeholder: "e.g. 350021...",
              inputType: "number",
              control,
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "address",
              label: "Address",
              placeholder: "Enter Address",
              control,
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
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "alternate_email",
              label: "Alternate Email Address",
              placeholder: "e.g. abc@gmail.com...",
              inputType: "email",
              control,
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "primary_contact_number",
              label: "Primary Contact Number",
              placeholder: "Enter Contact Number",
              inputType: "number",
              control,
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "alternate_contact_number",
              label: "Alternate Contact Number",
              placeholder: "Enter Alternate Contact Number",
              inputType: "number",
              control,
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
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "gst_number",
              label: "GST Number",
              placeholder: "Enter GST Number",
              control,
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "trn_number",
              label: "TRN Number",
              placeholder: "Enter TRN Number",
              control,
            })}

            {renderInput<CompanyFormSchema>({
              fieldName: "tan_number",
              label: "TAN Number",
              placeholder: "Enter TAN Number",
              control,
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
  );
};

export default CompanyDetails;
