import { Avatar } from "@mui/material";

export const UserAvatar = ({
  avatar = "https://storage.googleapis.com/reco_dev/avatars/krishna-svgrepo-com.svg",
}) => {
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
