import Select, { type Props as SelectProps } from "react-select";
import { useColorMode } from "./color-mode";

export type SelectOptionsType = {
  label: string;
  value: string;
};

type UiSelectProps = SelectProps<SelectOptionsType> & {
  menuWidth : string | number | undefined
};

export const UiSelect = ({ options, menuWidth, ...props }: UiSelectProps) => {
  const { colorMode } = useColorMode();

  return (
    <Select
      className="w-full"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "initial",
          color: "initial",
          fontSize: "14px",
          borderColor: state.isFocused ? "#1E88F8" : "",
          boxShadow: state.isFocused ? "0 0 0 1px #1E88F8" : "none",
          "&:hover": {
            borderColor: "",
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colorMode === "dark" ? "black" : "white",
          width : menuWidth ? menuWidth : "inherit"
        }),
        option: (baseStyles, props) => ({
          ...baseStyles,
          fontSize: "14px",
          backgroundColor: props.isSelected
            ? "#1E88F8"
            : props.isFocused
            ? colorMode === "dark"
              ? "#171717"
              : "#d9e2ff"
            : "transparent",
          ":hover": {
            backgroundColor: !props.isSelected ? colorMode === "dark" ? "#171717" : "auto" : "auto" ,
          },
        }),
      }}
      options={options}
      {...props}
    />
  );
};
