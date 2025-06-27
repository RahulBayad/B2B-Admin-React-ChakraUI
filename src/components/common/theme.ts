import {
  defineConfig,
  createSystem,
  defineRecipe,
  defaultConfig,
} from "@chakra-ui/react";

// Define component recipes
const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "medium",
    borderRadius: "md",
    transition: "all 0.2s",
  },
  variants: {
    variant: {
      solid: {
        bg: "primary.500",
        color: "white",
        _hover: {
          bg: "primary.600",
        },
      },
      outline: {
        bgColor : "white",
        _dark : {
          bg : "blackAlpha.300"
        }
      },
      
    },
  },
});
const inputRecipe = defineRecipe({
  base: {
    transition: "all 0.2s",
    _focus: {
      focusRingColor: "primary.600",
    }
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: "#E3F2FD" },
          100: { value: "#BBDEFB" },
          200: { value: "#90CAF9" },
          300: { value: "#64B5F6" },
          400: { value: "#42A5F5" },
          500: { value: "#2196F3" },
          600: { value: "#1E88F8" },
          700: { value: "#1976D2" },
          800: { value: "#1565C0" },
          900: { value: "#0D47A1" },
        },
        gray: {
          50: { value: "#F7FAFC" },
          100: { value: "#EDF2F7" },
          200: { value: "#E2E8F0" },
          300: { value: "#CBD5E0" },
          400: { value: "#A0AEC0" },
          500: { value: "#718096" },
          600: { value: "#4A5568" },
          700: { value: "#2D3748" },
          800: { value: "#1A202C" },
          900: { value: "#171923" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      input: inputRecipe
    },
  },
});

// Create the system
export const theme = createSystem(defaultConfig, config);
