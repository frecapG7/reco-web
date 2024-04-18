import { Avatar, Card, CardContent, CardHeader } from "@mui/material";

export const UserCard = ({ user, disabled }) => {
  return (
    <Card
      sx={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
        width: '300',
      }}
    >
      <CardHeader
        avatar={<Avatar src={user.avatar} />}
        title={user.name}
        subheader={user.title}
      />
      <CardContent></CardContent>
    </Card>
  );
};
