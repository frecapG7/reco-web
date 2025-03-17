import { Box, Chip, Stack, Typography } from "@mui/material";
import { useGetMetrics } from "../../hooks/api/users/useUsers";

import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

export const UserMetrics = ({ user }) => {
  const { data: metrics } = useGetMetrics(user?.id, {
    enabled: !!user,
  });

  return (
    <Stack spacing={2} width="100%">
      <Box>
        <Box display="flex" alignItems="center">
          <LocalFireDepartmentOutlinedIcon />
          <Typography fontWeight="bold">
            {metrics?.requests.total} Requests
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <Chip
            color="primary"
            label={metrics?.requests.books}
            icon={<MenuBookRoundedIcon />}
          />
          <Chip
            color="primary"
            label={metrics?.requests.movies}
            icon={<MovieOutlinedIcon />}
          />
          <Chip
            color="primary"
            label={metrics?.requests.songs}
            icon={<AudiotrackOutlinedIcon />}
          />
        </Box>
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
          <LocalPizzaOutlinedIcon />
          <Typography fontWeight="bold">
            {metrics?.requests.total} Recommendations
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <Chip
            color="primary"
            label={metrics?.requests.books}
            icon={<MenuBookRoundedIcon />}
          />
          <Chip
            color="primary"
            label={metrics?.requests.movies}
            icon={<MovieOutlinedIcon />}
          />
          <Chip
            color="primary"
            label={metrics?.requests.songs}
            icon={<AudiotrackOutlinedIcon />}
          />
        </Box>
      </Box>
    </Stack>
  );
};
