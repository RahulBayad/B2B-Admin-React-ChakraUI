import { renderInput, renderSelect } from "@/components/ui/form/formInput";
import { Box, Button, Heading, IconButton } from "@chakra-ui/react";
import { Plus, Trash } from "lucide-react";
import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

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
