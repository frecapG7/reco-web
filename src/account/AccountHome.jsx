import { useGetMe } from "../hooks/api/users/useUsers";

import {
  Avatar,
  Box,
  Container,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useI18nTime from "../hooks/i18n/useI18nTime";
import PersonIcon from "@mui/icons-material/Person";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import { useTranslation } from "react-i18next";

const tabs = ["my-metrics", "my-requests", "my-recommendations"];

export const AccountHome = () => {
  const { data: user } = useGetMe();

  const [tab, setTab] = useState("my-metrics");

  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const { t } = useTranslation();
  const { formatDate } = useI18nTime();

  useEffect(() => {
    if (tabs.includes(tab)) navigate(`./${tab}`);
  }, [tab, navigate]);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {user ? (
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{
                width: { xs: 50, sm: 100 },
                height: { xs: 50, sm: 100 },
              }}
            />
          ) : (
            <Skeleton variant="circular" width={100} height={100} />
          )}
          <Box display="flex" alignItems="center" flexDirection="column">
            {user ? (
              <Typography variant="title">{user.name}</Typography>
            ) : (
              <Skeleton variant="text" width={150} />
            )}

            <Box alignItems="center" display="flex" gap={1}>
              <PersonIcon />
              {user ? (
                <Typography>{formatDate(user?.created)}</Typography>
              ) : (
                <Skeleton variant="text" width={50} />
              )}
            </Box>
          </Box>
        </Box>

        <Fade in={Boolean(user)}>
          <List>
            <ListItem dense>
              <ListItemButton>
                <ListItemIcon aria-label="edit-profile">
                  <FaceRetouchingNaturalOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={t("account.editAvatar")} />
              </ListItemButton>
            </ListItem>
            <ListItem dense>
              <ListItemButton>
                <ListItemIcon aria-label="edit-profile">
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={t("account.editAvatar")} />
              </ListItemButton>
            </ListItem>
          </List>
        </Fade>
      </Box>
      <Paper variant="brutalist1">
        <Box my={2}>
          <Tabs
            value={tab}
            textColor="primary"
            indicatorColor="primary"
            onChange={handleTabChange}
          >
            <Tab label="Metrics" value="my-metrics" />
            <Tab label="Requests" value="my-requests" />
            <Tab label="Recommendations" value="my-recommendations" />
          </Tabs>
        </Box>
        <Zoom key={tab} in>
          <Box aria-label="account-tabs-content">
            <Outlet
              context={{
                user,
              }}
            />
          </Box>
        </Zoom>
      </Paper>
    </Container>
  );
};
