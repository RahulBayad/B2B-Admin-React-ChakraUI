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

export const bankDetails = <T extends FieldValues>({
  name,
  control,
}: {
  name: ArrayPath<T>;
  control: Control<T>;
}) => {
  const newBankDetail = {
    account_number: "",
    account_holder_name: "",
    bank_name: "",
    ifsc_code: "",
    primary: null,
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
                <Heading size="md">Bank {index + 1}</Heading>
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
                
                {renderInput<T>({
                  fieldName: `bank_details.${index}.account_number` as FieldPath<T>,
                  label: "Office Name",
                  control: control,
                  placeholder: "Enter Office Name",
                })}
                {renderInput<T>({
                  fieldName: `bank_details.${index}.account_holder_name` as FieldPath<T>,
                  label: "GST/REG. Number",
                  control: control,
                  placeholder: "Enter Office Name",
                })}
                {renderInput<T>({
                  fieldName: `bank_details.${index}.bank_name` as FieldPath<T>,
                  label: "Contact Person",
                  control: control,
                  placeholder: "Enter Office Name",
                })}
                {renderInput<T>({
                  fieldName: `bank_details.${index}.ifsc_code` as FieldPath<T>,
                  label: "Email Address",
                  control: control,
                  placeholder: "Enter Office Name",
                  inputType: "email",
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
          onClick={() => append(newBankDetail as any)}
        >
          <Plus /> Add Bank
        </Button>
      </div>
    </Box>
  );
};
