import { Box, Card, Field, Heading, Input } from "@chakra-ui/react";
import type { CompanyFormSchema } from "./CreateCompany";
import { Controller, useFormContext } from "react-hook-form";
import { renderInput, renderSelect } from "@/components/ui/form/formInput";
import { UiSelect, type SelectOptionsType } from "@/components/ui/UISelect";
import { useMemo } from "react";
import { getContactCodesOptions } from "@/utils/contactCodes";
import { Country } from "country-state-city";

const References = () => {
  const { control } = useFormContext<CompanyFormSchema>();
  const countries = useMemo(() => Country.getAllCountries(), []);
    const contactCodesOptions = useMemo(
      () => getContactCodesOptions(countries),
      [countries]
    );

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
          <div className="flex">
            <Field.Root>
              <Field.Label>Contact Number</Field.Label>
              <div className="flex gap-1 mt-0">
                <div className="w-[150px]">
                  <Controller
                    name="reference.phone_code"
                    control={control}
                    render={({ field }) => (
                      <UiSelect
                        {...field}
                        value={contactCodesOptions.find(
                          (opt) => opt.value === field.value
                        )}
                        onChange={(val) =>
                          field.onChange((val as SelectOptionsType)?.value)
                        }
                        placeholder=""
                        menuWidth="200px"
                        styles={{
                          dropdownIndicator: (base) => ({
                            ...base,
                            padding: "0 3px",
                          }),
                        }}
                        options={contactCodesOptions}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="reference.phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Enter Contact Number"
                      {...field}
                      value={(field.value as string | number | null) ?? ""}
                    />
                  )}
                />
              </div>
            </Field.Root>
          </div>
          
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

export default References;
