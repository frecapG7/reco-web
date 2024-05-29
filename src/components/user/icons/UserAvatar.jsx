import { Avatar } from "@mui/material";

export const UserAvatar = ({ avatar }) => {
  return (
    <Avatar
      src={avatar}
      sx={{
        width: 100,
        height: 100,
        backgroundColor: "tertiary.dark",
        fontSize: 50,
      }}
    />
  );
};
