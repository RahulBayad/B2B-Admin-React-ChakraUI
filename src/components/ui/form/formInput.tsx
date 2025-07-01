import {
  Field,
  FieldErrorText,
  FileUpload,
  Input,
  RadioGroup,
  Wrap,
} from "@chakra-ui/react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { UiSelect, type SelectOptionsType } from "@/components/ui/UISelect";

type RenderInputProps<T extends FieldValues> = {
  fieldName: FieldPath<T>;
  label?: string;
  placeholder?: string;
  control: Control<T>;
  inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
};

type RenderSelectProps<T extends FieldValues> = {
  fieldName: FieldPath<T>;
  label?: string;
  placeholder: string;
  options: SelectOptionsType[];
  control: Control<T>;
};

type RenderInputFileProps<T extends FieldValues> = {
  fieldName: FieldPath<T>;
  label?: string;
  control: Control<T>;
};

export function renderInput<T extends FieldValues>({
  fieldName,
  label,
  placeholder,
  control,
  inputType = "text",
}: RenderInputProps<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root invalid={!!fieldState.error}>
          <Field.Label>{label}</Field.Label>
          <Input
            type={inputType}
            placeholder={placeholder}
            {...field}
            value={(field.value as string | number | null) ?? ""}
          />
          <FieldErrorText>{fieldState.error?.message || ""}</FieldErrorText>
        </Field.Root>
      )}
    />
  );
}

export function renderSelect<T extends FieldValues>({
  fieldName,
  label,
  placeholder,
  options,
  control,
}: RenderSelectProps<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root invalid={!!fieldState.error}>
          <Field.Label>{label}</Field.Label>
          <UiSelect
            {...field}
            value={options.find(
              (opt) => opt.value === (field.value as SelectOptionsType)?.value
            )}
            isClearable
            onChange={(val) =>
              field.onChange((val as SelectOptionsType)?.value)
            }
            placeholder={placeholder}
            options={options}
          />
          <FieldErrorText>{fieldState.error?.message || ""}</FieldErrorText>
        </Field.Root>
      )}
    />
  );
}
export function renderInputFile<T extends FieldValues>({
  fieldName,
  label,
  control,
}: RenderInputFileProps<T>) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root invalid={!!fieldState.error}>
          <Field.Label>{label}</Field.Label>
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
        </Field.Root>
      )}
    />
  );
}

export function renderRadio<T extends FieldValues>({
  fieldName,
  label,
  control,
  options,
  width= "auto"
}: {
  fieldName: FieldPath<T>;
  label?: string;
  control: Control<T>;
  options: SelectOptionsType[];
  width? : string | number;
}) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root invalid={!!fieldState.error} width={width}>
          <Field.Label mb={1}>{label}</Field.Label>
          <RadioGroup.Root
            value={field.value}
            onValueChange={(e) => field.onChange(e.value)}
            colorPalette="blue"
          >
            <Wrap gap={3}>
              {options.map((option) => (
                <RadioGroup.Item value={option.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </Wrap>
          </RadioGroup.Root>
          <FieldErrorText>{fieldState.error?.message || ""}</FieldErrorText>
        </Field.Root>
      )}
    />
  );
}
