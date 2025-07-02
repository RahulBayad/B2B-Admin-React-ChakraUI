import { Button } from "@chakra-ui/react";

type StatusProps = {
  label: "Active" | "Verified" | "Inactive" | "Unverified" | "Pending";
};
const StatusTag = (props: StatusProps) => {
  const { label } = props;

  if (label === "Active" || label === "Verified") {
    return (
      <Button 
        minWidth="auto"
        py={0}
        px={3}
        height="auto"
        fontWeight={400}
        variant="plain"
        bgColor="green.100"
        color="green.600"
        borderColor="green.400"
        fontSize="12px"
        letterSpacing="0.2px"
        rounded="full"
        _dark={{
          bgColor: "green.900",
          color: "white",
          fontWeight: 100,
          // borderColor: "green.600"
        }}
      >
        {label}
      </Button>
    )
  }
  if (label === "Inactive" || label === "Unverified") {
    return (
      <Button 
        minWidth="auto"
        py={0}
        px={3}
        height="auto"
        fontWeight={400}
        variant="plain"
        bgColor="red.100"
        color="red.600"
        borderColor="red.300"
        fontSize="xs"
        letterSpacing="0.2px"
        rounded="full"
        _dark={{
          bgColor: "red.800",
          color: "white",
          borderColor: "red.600",
        }}
      >
        {label}
      </Button>
    );
  }
  if (label === "Pending") {
    return (
      <Button 
        minWidth="auto"
        py={0}
        px={3}
        height="auto"
        fontWeight={400}
        variant="plain"
        bgColor="yellow.100"
        color="yellow.600"
        borderColor="yellow.400"
        fontSize="xs"
        letterSpacing="0.2px"
        rounded="full"
        _dark={{
          bgColor: "yellow.900",
          color: "white",
          borderColor: "yellow.600",
        }}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button 
        minWidth="auto"
        py={0}
        px={3}
        height="auto"
        fontWeight={400}
        variant="plain"
        bgColor="gray.100"
        color="gray.600"
        borderColor="gray.400"
        fontSize="xs"
        letterSpacing="0.2px"
        rounded="full"
      >
        {label}
      </Button>
  );
};

export default StatusTag;
