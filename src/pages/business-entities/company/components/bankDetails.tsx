import { renderInput, renderSelect } from "@/components/ui/form/formInput";
import { Box, Button, Card, Heading, IconButton } from "@chakra-ui/react";
import { Plus, Trash } from "lucide-react";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import type { CompanyFormSchema } from "./CreateCompany";

const BankDetails = () => {
  const { control } = useFormContext<CompanyFormSchema>();
  const newBankDetail = {
    account_number: "",
    account_holder_name: "",
    bank_name: "",
    ifsc_code: "",
    primary: false,
  };

  const { append, remove, fields } = useFieldArray({
    control,
    name : "bank_details",
  });
  return (
    <Card.Root>
      <Card.Body>
        <Heading mb={4}>Bank Details</Heading>

        <Box>
          <Box>
            {fields.map((field, index) => {
              return (
                <Box position="relative" key={field.id}>
                  <Box mb={2} className="flex justify-between items-center">
                    <Heading size="md">
                      {index !== 0
                        ? "Alternate Bank Account"
                        : "Primary Bank Account"}
                    </Heading>
                    {index !== 0 && (
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
                    )}
                  </Box>
                  <Box
                    key={field.id}
                    borderWidth={1}
                    p={4}
                    className="relative rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {renderInput<CompanyFormSchema>({
                      fieldName:
                        `bank_details.${index}.account_number`,
                      label: "Account Number",
                      control: control,
                      placeholder: "e.g. 203XXXXXXX33...",
                      inputType: "number",
                    })}
                    {renderSelect<CompanyFormSchema>({
                      fieldName:
                        `bank_details.${index}.account_type`,
                      label: "Account Type",
                      options: [
                        {label: "Savings", value: "Savings"},
                        {label: "Current", value: "Current"},
                      ],
                      control: control,
                      placeholder: "Select Account Type",
                    })}
                    {renderInput<CompanyFormSchema>({
                      fieldName:
                        `bank_details.${index}.account_holder_name`,
                      label: "Account Holder Name",
                      control: control,
                      placeholder: "e.g. Nitesh Verma",
                    })}
                    {renderInput<CompanyFormSchema>({
                      fieldName:
                        `bank_details.${index}.bank_name`,
                      label: "Bank Name",
                      control: control,
                      placeholder: "Enter Bank Name",
                    })}
                    {renderInput<CompanyFormSchema>({
                      fieldName:
                        `bank_details.${index}.ifsc_code`,
                      label: "IFSC Code",
                      control: control,
                      placeholder: "Enter IFSC Code",
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
      </Card.Body>
    </Card.Root>
  );
};

export default BankDetails;