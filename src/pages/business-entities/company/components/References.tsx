import { Box, Card, Heading } from "@chakra-ui/react";
import type { CompanyFormSchema } from "./CreateCompany";
import { useFormContext } from "react-hook-form";
import {
  renderInput,
  renderSelect,
} from "@/components/ui/form/formInput";

const References = () => {
  const { control } = useFormContext<CompanyFormSchema>();
  return (
    <Card.Root>
      <Card.Body>
        <Heading mb={4}>References</Heading>
        <Box
          borderWidth={1}
          p={4}
          className="relative rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {renderInput<CompanyFormSchema>({
            fieldName: "reference.person_name",
            label: "Person Name",
            placeholder: "Enter Person Name",
            control,
          })}
          {renderSelect<CompanyFormSchema>({
            fieldName: "reference.designation",
            label: "Designation",
            placeholder: "Select Designation",
            options: [
              { label: "HR", value: "HR" },
              { label: "Manager", value: "Manager" },
            ],
            control,
          })}
          {renderInput<CompanyFormSchema>({
            fieldName: "reference.company_name",
            label: "Company Name",
            placeholder: "Enter Company Name",
            control,
          })}
          {renderInput<CompanyFormSchema>({
            fieldName: "reference.email",
            label: "Person Name",
            placeholder: "Enter Person Name",
            control,
          })}
          {renderInput<CompanyFormSchema>({
            fieldName: "reference.phone",
            label: "Contact Number",
            placeholder: "Enter Contact Number",
            control,
            inputType: "number",
          })}
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

export default References;
