import {
  Card,
  Heading,
  Table,
  useMediaQuery,
} from "@chakra-ui/react";
import type { CompanyFormSchema } from "./CreateCompany";
import {
  useFormContext,
} from "react-hook-form";
import {
  renderInput,
  renderInputFile,
  renderSelect,
} from "@/components/ui/form/formInput";

const KycDocuments = () => {
  const { control } = useFormContext<CompanyFormSchema>();
  const [isMobile] = useMediaQuery(["(max-width: 767px)"])
  return (
    <Card.Root>
      <Card.Body>
        <Heading mb={4}>KYC Documents</Heading>

        {isMobile ? (
          <div>
            <div className="">
              {renderInputFile<CompanyFormSchema>({
                fieldName: "kyc_verification.pan_card.file",
                label: "PAN Certificate",
                control,
              })}
              {renderInput<CompanyFormSchema>({
                fieldName: "kyc_verification.pan_card.remark",
                placeholder: "Enter Remark",
                control,
              })}
              {renderSelect<CompanyFormSchema>({
                fieldName: "kyc_verification.pan_card.verified",
                options: [
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ],
                placeholder: "Select Yes or No",
                control,
              })}
            </div>

            <div>
              {renderInputFile<CompanyFormSchema>({
                fieldName: "kyc_verification.gst_certificate.file",
                label: "GST Certificate",
                control,
              })}
              {renderInput<CompanyFormSchema>({
                fieldName: "kyc_verification.gst_certificate.remark",
                placeholder: "Enter Remark",
                control,
              })}
              {renderSelect<CompanyFormSchema>({
                fieldName: "kyc_verification.gst_certificate.verified",
                options: [
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ],
                placeholder: "Select Yes or No",
                control,
              })}
            </div>

            <div>
              {renderInputFile<CompanyFormSchema>({
                fieldName: "kyc_verification.authority_letter.file",
                label: "Authority Letter",
                control,
              })}
              {renderInput<CompanyFormSchema>({
                fieldName: "kyc_verification.authority_letter.remark",
                placeholder: "Enter Remark",
                control,
              })}
              {renderSelect<CompanyFormSchema>({
                fieldName: "kyc_verification.authority_letter.verified",
                options: [
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ],
                placeholder: "Select Yes or No",
                control,
              })}
            </div>

            <div>
              {renderInputFile<CompanyFormSchema>({
                fieldName: "kyc_verification.194Q_declaration.file",
                label: "194Q Declaration",
                control,
              })}
              {renderInput<CompanyFormSchema>({
                fieldName: "kyc_verification.194Q_declaration.remark",
                placeholder: "Enter Remark",
                control,
              })}
              {renderSelect<CompanyFormSchema>({
                fieldName: "kyc_verification.194Q_declaration.verified",
                options: [
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ],
                placeholder: "Select Yes or No",
                control,
              })}
            </div>
          </div>
        ) : (
          <Table.Root size="md" variant="outline" showColumnBorder>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Documents</Table.ColumnHeader>
                <Table.ColumnHeader width="25%">Upload File</Table.ColumnHeader>
                <Table.ColumnHeader>Remark</Table.ColumnHeader>
                <Table.ColumnHeader>Verified</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>PAN Card</Table.Cell>
                <Table.Cell>
                  {renderInputFile<CompanyFormSchema>({
                    fieldName: "kyc_verification.pan_card.file",
                    // label: "PAN Certificate",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderInput<CompanyFormSchema>({
                    fieldName: "kyc_verification.pan_card.remark",
                    placeholder: "Enter Remark",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderSelect<CompanyFormSchema>({
                    fieldName: "kyc_verification.pan_card.verified",
                    options: [
                      { label: "Yes", value: "Yes" },
                      { label: "No", value: "No" },
                    ],
                    placeholder: "Select Yes or No",
                    control,
                  })}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>GST Certificate</Table.Cell>
                <Table.Cell>
                  {renderInputFile<CompanyFormSchema>({
                    fieldName: "kyc_verification.gst_certificate.file",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderInput<CompanyFormSchema>({
                    fieldName: "kyc_verification.gst_certificate.remark",
                    placeholder: "Enter Remark",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderSelect<CompanyFormSchema>({
                    fieldName: "kyc_verification.gst_certificate.verified",
                    options: [
                      { label: "Yes", value: "Yes" },
                      { label: "No", value: "No" },
                    ],
                    placeholder: "Select Yes or No",
                    control,
                  })}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Authority Letter</Table.Cell>
                <Table.Cell>
                  {renderInputFile<CompanyFormSchema>({
                    fieldName: "kyc_verification.authority_letter.file",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderInput<CompanyFormSchema>({
                    fieldName: "kyc_verification.authority_letter.remark",
                    placeholder: "Enter Remark",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderSelect<CompanyFormSchema>({
                    fieldName: "kyc_verification.authority_letter.verified",
                    options: [
                      { label: "Yes", value: "Yes" },
                      { label: "No", value: "No" },
                    ],
                    placeholder: "Select Yes or No",
                    control,
                  })}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>194Q Declaration</Table.Cell>
                <Table.Cell>
                  {renderInputFile<CompanyFormSchema>({
                    fieldName: "kyc_verification.194Q_declaration.file",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderInput<CompanyFormSchema>({
                    fieldName: "kyc_verification.194Q_declaration.remark",
                    placeholder: "Enter Remark",
                    control,
                  })}
                </Table.Cell>
                <Table.Cell>
                  {renderSelect<CompanyFormSchema>({
                    fieldName: "kyc_verification.194Q_declaration.verified",
                    options: [
                      { label: "Yes", value: "Yes" },
                      { label: "No", value: "No" },
                    ],
                    placeholder: "Select Yes or No",
                    control,
                  })}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default KycDocuments;
