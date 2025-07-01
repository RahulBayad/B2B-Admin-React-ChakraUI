import { Card, Heading } from "@chakra-ui/react";
import type { CompanyFormSchema } from "./CreateCompany";
import { useFormContext } from "react-hook-form";

const MemberManagement = () => {
  const { control } = useFormContext<CompanyFormSchema>();
  return (
    <Card.Root>
      <Card.Body>
        <Heading mb={4}>Accesibility</Heading>
      </Card.Body>
    </Card.Root>
  );
};

export default MemberManagement;
