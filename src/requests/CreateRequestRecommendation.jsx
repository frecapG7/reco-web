import {
  Container,
  Zoom,
  Box,
  Button,
  Stack,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Skeleton,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FormSearch } from "../components/form/FormSearch";
import { useCreateRequestRecommendation } from "../hooks/api/requests/useRecommendations";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSearchRecommendations } from "../hooks/api/recommendations/recommendations";
import { useForm, useWatch } from "react-hook-form";
import { FormSongProvider } from "./components/FormSongProvider";
import { IFramely } from "../components/request/IFramely";

export const CreateRequestRecommendation = () => {
  const { request } = useOutletContext();
  const [recommendation, setRecommendation] = useState(null);
  const [note, setNote] = useState("");

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { control } = useForm();
  const search = useWatch({
    control,
    name: "search",
  });
  const provider = useWatch({
    control,
    name: "provider",
  });

  const { data: recommendations, isLoading } = useSearchRecommendations(
    request?.requestType,
    search,
    isUpSm ? 15 : 5,
    provider,
    {
      enabled: search?.length > 2,
    }
  );
  const createRequestRecommendation = useCreateRequestRecommendation(
    request?.id
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async () => {
    await createRequestRecommendation.mutateAsync({
      ...recommendation,
      note,
    });
    toast.success(t("recommendationCreated"));
    navigate(`/requests/${request.id}`);
  };

  return (
    <Container>
      <Zoom in={!recommendation} unmountOnExit>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={4}
          >
            <FormSearch control={control} name="search" label={t("search")} />
            <Box maxWith={50}>
              <FormSongProvider
                control={control}
                requestType={request?.requestType}
              />
            </Box>
          </Box>

          <List>
            {recommendations?.map((recommendation, index) => (
              <ListItem key={index} dense>
                <ListItemButton
                  onClick={() => setRecommendation(recommendation)}
                >
                  <ListItemIcon>
                    <Box
                      component="img"
                      src={recommendation?.thumbnail}
                      maxWidth={75}
                      mr={2}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={recommendation?.title}
                    secondary={recommendation.author}
                  />
                  <Box
                    component="img"
                    src={recommendation.provider?.icon}
                    maxWidth={60}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            {isLoading && (
              <ListItem>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton variant="text" width={200} />}
                  secondary={<Skeleton variant="text" width={100} />}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Zoom>
      <Zoom in={Boolean(recommendation)} mountOnEnter unmountOnExit>
        <Stack spacing={2}>
          <IFramely html={recommendation?.html} />
          <TextField
            fullWidth
            name="note"
            value={note}
            multiline
            rows={5}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note to your recommendation"
          />

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<CancelOutlinedIcon />}
              onClick={() => setRecommendation(null)}
            >
              {t("cancel")}
            </Button>

            <Button
              variant="contained"
              color="primary"
              endIcon={<CancelOutlinedIcon />}
              onClick={onSubmit}
              loading={createRequestRecommendation.isPending}
            >
              {t("create")}
            </Button>
          </Box>
        </Stack>
      </Zoom>
    </Container>
  );
};
