import { IconButton, type ButtonProps } from "@chakra-ui/react";
import { Edit, EllipsisVertical, Eye } from "lucide-react";

export const EditBtn = (props: ButtonProps) => {
  return (
    <IconButton 
        variant='subtle'
        p={0}
        height="24px"
        width="24px"
        minWidth="auto"
        {...props} 
    >
      <Edit style={{width: 14}}/>
    </IconButton>
  );
};

export const ViewBtn = (props: ButtonProps) => {
  return (
    <IconButton 
        variant='subtle'
        p={0}
        height="24px"
        width="24px"
        minWidth="auto"
        {...props} 
    >
      <Eye style={{width: 14}}/>
    </IconButton>
  );
};

export const MenuBtn = (props: ButtonProps) => {
  return (
    <IconButton 
        variant='subtle'
        p={0}
        height="24px"
        width="24px"
        minWidth="auto"
        {...props} 
    >
      <EllipsisVertical style={{width: 14}}/>
    </IconButton>
  );
};
