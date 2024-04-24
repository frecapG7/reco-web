import { Avatar, Box, Typography } from "@mui/material";

export const UserName = ({ user }) => {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={5}>
      <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />

      <Box>
        <Typography variant="h4">{user.name}</Typography>
        <Typography variant="subtitle1">{user.title}</Typography>
      </Box>
    </Box>
  );
};
