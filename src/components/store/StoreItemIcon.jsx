import FaceIcon from "@mui/icons-material/Face";

export const StoreItemIcon = ({ type, color, fontSize }) => {
  switch (type) {
    case "IconItem":
      return <FaceIcon color={color} fontSize={fontSize} />;
    default:
      return type;
  }
};
