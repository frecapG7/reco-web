import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { UserName } from "../components/user/UserName";
import { UserCard } from "../components/user/UserCard";
import { RecommendationCard } from "../components/request/RecommendationCard";

export const RequestDetails = ({ request }) => {
  return (
    <Stack spacing={6}>
      <Box>
        <UserName user={request.author} />
      </Box>

      <Box>
        <Typography variant="h4">{request.title}</Typography>
      </Box>

      <Box>
        <Typography variant="body1">{request.description}</Typography>
      </Box>

      <Paper
        sx={{
          my: 5,
          p: 5,
          bgcolor: "primary.dark",
        }}
      >
        <RecommendationCard
          recommendation={{
            user: {
              name: "John Doe",
              avatar: "https://randomuser.me/api/portraits",
              title: "Software Engineer",
            },
            field1: "Field 1",
            field2: "Field 2",
            field3: "Field 3",
            created: "2021-10-01",
          }}
        />
      </Paper>
    </Stack>
  );
};
