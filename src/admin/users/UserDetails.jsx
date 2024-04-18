import { useParams } from "react-router-dom";
import { useGetUser } from "../../hooks/api/admin/userUserAdministration";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SavingsIcon from "@mui/icons-material/Savings";

import { i18nDate } from "../../utils/i18n";

export const UserDetails = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError, error } = useGetUser(id);

  if (isLoading)
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box align="center">
        <Typography variant="h6" color="error">
          {error.message}
        </Typography>
      </Box>
    );

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={0}
        sx={{
          my: 5,
          bgcolor: "primary.dark",
        }}
      >
        <Stack spacing={5}>
          <Box
            sx={{
              my: 5,
              px: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={5}
            >
              <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />

              <Box>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="subtitle1">{user.title}</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                borderRadius: 5,
                backgroundColor: "primary.light",
                padding: 10,
              }}
              align="center"
            >
              <Badge
                color="success"
                badgeContent={user.balance}
                sx={{
                  color: "yellow",
                  fontSize: 20,
                }}
              >
                <SavingsIcon fontSize="large" color="yellow" />
              </Badge>
            </Box>

            <Box aria-label="actions-button">
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Box>
          </Box>

          <Box
            aria-label="boring-informations"
            sx={{
              marginTop: 50,
            }}
          >
            <Typography>Created on {i18nDate(user?.created)}</Typography>
            <Typography>Email: {user.email}</Typography>
          </Box>

          <Paper elevation={1}>
            <Typography>Last requests</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Request 1" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Request 1" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Request 1" />
              </ListItem>
            </List>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
};
