import { Field, FileUpload, Input } from "@chakra-ui/react";
import { Controller, type Control, type FieldErrors, type FieldPath, type FieldValues } from "react-hook-form";
import { UiSelect, type SelectOptionsType } from "@/components/ui/UISelect";

type RenderInputProps<T extends FieldValues> = {
  fieldName: FieldPath<T>;
  label: string;
  placeholder: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
};

type RenderSelectProps<T extends FieldValues> = {
  fieldName: FieldPath<T>;
  label: string;
  placeholder: string;
  options: SelectOptionsType[];
  control: Control<T>;
  errors?: FieldErrors<T>;
};

type RenderInputFileProps<T extends FieldValues> = {
  fieldName: FieldPath<T>;
  label: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
};

export function renderInput<T extends FieldValues>({
  fieldName,
  label,
  placeholder,
  control,
  errors,
  inputType = "text",
}: RenderInputProps<T>) {
  return (
    <Field.Root invalid={!!errors?.[fieldName]}>
      <Field.Label>{label}</Field.Label>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Input
            type={inputType}
            placeholder={placeholder}
            {...field}
            value={(field.value as string | number | null) ?? ""}
          />
        )}
      />
      <Field.ErrorText>
        {typeof errors?.[fieldName]?.message === "string"
          ? errors[fieldName]?.message
          : ""}
      </Field.ErrorText>
    </Field.Root>
  );
}

export function renderSelect<T extends FieldValues>({
  fieldName,
  label,
  placeholder,
  options,
  control,
  errors,
}: RenderSelectProps<T>) {
  return (
    <Field.Root invalid={!!errors?.[fieldName]}>
      <Field.Label>{label}</Field.Label>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <UiSelect
            {...field}
            value={options.find(
              (opt) =>
                opt.value === (field.value as SelectOptionsType)?.value
            )}
            isClearable
            onChange={(val) => field.onChange(val)}
            placeholder={placeholder}
            options={options}
          />
        )}
      />
      <Field.ErrorText>
        {typeof errors?.[fieldName]?.message === "string"
          ? errors[fieldName]?.message
          : ""}
      </Field.ErrorText>
    </Field.Root>
  );
}
export function renderInputFile<T extends FieldValues>({
  fieldName,
  label,
  control,
  errors,
}: RenderInputFileProps<T>) {
  return (
    <Field.Root invalid={!!errors?.[fieldName]}>
      <Field.Label>{label}</Field.Label>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <FileUpload.Root>
            <FileUpload.HiddenInput
              onChange={(e) => field.onChange(e.target?.files?.[0])}
            />
            <Input asChild>
              <FileUpload.Trigger>
                <FileUpload.FileText />
              </FileUpload.Trigger>
            </Input>
          </FileUpload.Root>
        )}
      />
      <Field.ErrorText>
        {typeof errors?.[fieldName]?.message === "string"
          ? errors[fieldName]?.message
          : ""}
      </Field.ErrorText>
    </Field.Root>
  );
}