import Select, { type Props as SelectProps } from "react-select";

export type SelectOptionsType = {
  label: string;
  value: string;
};

type UiSelectProps = SelectProps<SelectOptionsType>

export const UiSelect = ({ options, ...props }: UiSelectProps) => {
  return (
    <Select
      className="w-full text-xs"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "14px",
          borderColor: state.isFocused ? "#1E88F8" : "",
          boxShadow: state.isFocused ? "0 0 0 1px #1E88F8" : "none",
          "&:hover": {
            borderColor: "",
          },
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          fontSize: "14px",
        }),
      }}
      options={options}
      {...props}
    />
  );
};
