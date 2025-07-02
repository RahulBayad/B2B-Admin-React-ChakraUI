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
  renderInput,
  renderInputFile,
  renderRadio,
} from "@/components/ui/form/formInput";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash } from "lucide-react";

const Accessibility = () => {
  const { control } = useFormContext<CompanyFormSchema>();
  const newBillingDoc = {
    account_number: "",
    account_holder_name: "",
    bank_name: "",
    ifsc_code: "",
    primary: false,
  };

  const { append, remove, fields } = useFieldArray({
    control,
    name: "accessibility.billingDoc",
  });

  return (
    <Card.Root>
      <Card.Body>
        <Heading mb={4}>Accesibility</Heading>
        <Box
          borderWidth={1}
          p={4}
          boxShadow="inset 1px 1px 6px 0px #ececec"
          className="relative rounded-md flex gap-x-6 gap-y-2"
        >
          {renderRadio<CompanyFormSchema>({
            fieldName: "accessibility.enableBilling",
            control,
            label: "Enable Biling",
            options: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
          })}
          {renderRadio<CompanyFormSchema>({
            fieldName: "accessibility.userAccess",
            control,
            label: "User Access",
            options: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
          })}
        </Box>
        <br />
        <Separator />
        <br />

        <Box>
          <div className="flex justify-between">
            <Heading mb={4}>Billing Documents</Heading>
            <Button
              variant="solid"
              size="sm"
              onClick={() => append(newBillingDoc as any)}
            >
              <Plus /> Add Billing Document
            </Button>
          </div>

          {fields.map((field, index) => {
            return (
              <Box mt={2}>
                <Box mb={2} className="flex justify-between items-center">
                  <Heading size="md">Document {index + 1}</Heading>

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
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {renderInput<CompanyFormSchema>({
                    fieldName: `accessibility.billingDoc.${index}.doc_name`,
                    control,
                    label: "Document Name",
                    placeholder: "Enter Document Name",
                  })}
                  {renderInputFile<CompanyFormSchema>({
                    fieldName: `accessibility.billingDoc.${index}.doc_file`,
                    control,
                    label: "Upload Document",
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

export default Accessibility;
