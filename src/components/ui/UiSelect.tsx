import Select, { type Props as SelectProps, components } from "react-select";
import { FixedSizeList as List } from "react-window";
import { useColorMode } from "./color-mode";
import type { JSX } from "react";

export type SelectOptionsType = {
  label: string | JSX.Element;
  value: string;
};

type UiSelectProps = SelectProps<SelectOptionsType> & {
  menuWidth: string | number | undefined;
  virtualized?: boolean;
  itemHeight?: number;
  maxHeight?: number;
};

// Custom MenuList component with virtualization
const VirtualizedMenuList = ({ options, children, maxHeight, getValue, ...props }: any) => {
  if (!children || !Array.isArray(children)) {
    return null;
  }

  const height = Math.min(maxHeight || 200, children.length * 35);

  const selectedValue = getValue();
  let initialScrollOffset = 0;

  if (selectedValue && selectedValue.length > 0) {
    const selectedIndex = options.findIndex((option: any) => option.value === selectedValue[0].value);
    if (selectedIndex !== -1) {
      // Calculate scroll position to center the selected item
      const itemHeight = 35;
      const visibleItems = Math.floor(height / itemHeight);
      const centerOffset = Math.max(0, (selectedIndex - Math.floor(visibleItems / 2)) * itemHeight);
      initialScrollOffset = centerOffset;
    }
  }

  return (
    <List
      height={height}
      itemCount={children.length}
      itemSize={35}
      width="100%"
      style={{ outline: 'none' }}
      initialScrollOffset={initialScrollOffset}
    >
      {({ index, style }) => (
        <div style={style}>
          {children[index]}
        </div>
      )}
    </List>
  );
};

export const UiSelect = ({ 
  options, 
  menuWidth, 
  virtualized = true, 
  itemHeight = 35,
  maxHeight = 200,
  styles,
  ...props 
}: UiSelectProps) => {
  const { colorMode } = useColorMode();

  // Custom components for virtualization
  const selectComponents = virtualized
    ? {
        MenuList: VirtualizedMenuList,
      }
    : {};

  return (
    <Select
      className="w-full"
      components={selectComponents}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "initial",
          color: "initial",
          fontSize: "14px",
          height: "40px",
          borderColor: state.isFocused ? "#1E88F8" : "",
          boxShadow: state.isFocused ? "0 0 0 1px #1E88F8" : "none",
          "&:hover": {
            borderColor: "",
          },
        }),
        
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colorMode === "dark" ? "black" : "white",
          width: menuWidth ? menuWidth : "inherit",
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          maxHeight: virtualized ? maxHeight : baseStyles.maxHeight,
        }),
        option: (baseStyles, props) => ({
          ...baseStyles,
          fontSize: "14px",
          height: virtualized ? itemHeight : "auto",
          backgroundColor: props.isSelected
            ? "#1E88F8"
            : props.isFocused
            ? colorMode === "dark"
              ? "#171717"
              : "#d9e2ff"
            : "transparent",
          ":hover": {
            backgroundColor: !props.isSelected 
              ? colorMode === "dark" 
                ? "#171717" 
                : "auto" 
              : "auto",
          },
        }),
        ...styles
      }}
      options={options}
      {...props}
    />
  );
};