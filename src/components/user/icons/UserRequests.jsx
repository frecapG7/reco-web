import { Badge, Box } from "@mui/material";
import LocalPostOfficeTwoToneIcon from "@mui/icons-material/LocalPostOfficeTwoTone";

export const UserRequests = ({ requests }) => {
  return (
    <Box align="center">
      <Badge
        color="success"
        badgeContent={requests}
        sx={{
          fontSize: 20,
        }}
      >
        <LocalPostOfficeTwoToneIcon
          color="yellow"
          sx={{
            backgroundColor: "secondary.main",
            fontSize: 50,
            borderRadius: "50%",
          }}
        />
      </Badge>
    </Box>
  );
};
