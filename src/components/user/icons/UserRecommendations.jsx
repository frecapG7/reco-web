import { Badge } from "@mui/material";
import LocalBarTwoToneIcon from "@mui/icons-material/LocalBarTwoTone";

export const UserRecommendations = ({ recommendations }) => {
  return (
    <Badge
      color="secondary"
      badgeContent={recommendations}
      sx={{
        fontSize: 20,
      }}
    >
      <LocalBarTwoToneIcon
        // color="yellow"
        sx={{
          // backgroundColor: "secondary.main",
          fontSize: 50,
          borderRadius: "50%",
        }}
      />
    </Badge>
  );
};
