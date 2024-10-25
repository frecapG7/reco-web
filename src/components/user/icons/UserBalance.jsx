import { Badge } from "@mui/material";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
export const UserBalance = ({ balance }) => {
  return (
    <Badge
      color="success"
      badgeContent={balance}
      sx={{
        fontSize: 20,
      }}
    >
      <SavingsTwoToneIcon
        color="yellow"
        sx={{
          backgroundColor: "secondary.main",
          fontSize: 50,
          borderRadius: "50%",
        }}
      />
    </Badge>
  );
};
