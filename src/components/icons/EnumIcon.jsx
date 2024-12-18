import { enumIcon } from "../../utils/enumUtils";

export const EnumIcon = ({ value, values, ...props }) => {
  const IconComponent = enumIcon(value, values);
  return <IconComponent {...props} />;
};
