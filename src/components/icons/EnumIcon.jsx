import { Skeleton } from "@mui/material";
import { enumIcon } from "../../utils/enumUtils";

export const EnumIcon = ({ value, values, ...props }) => {
  const IconComponent = enumIcon(value, values);

  if (!value) return <Skeleton variant="circular" {...props} />;
  return <IconComponent {...props} />;
};
