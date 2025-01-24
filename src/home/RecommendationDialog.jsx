import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Zoom,
} from "@mui/material";
import { useState } from "react";

import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { usePostRecommendation } from "../hooks/api/requests/useRecommendations";
import { useTranslation } from "react-i18next";
import { useAuthSession } from "../context/AuthContext";
import { RecommendationForm } from "../components/recommendation/RecommendationForm";
import { IFramely } from "../components/request/IFramely";
/**
 * Use this dialog to create new Recommendation
 * @param {*} param0
 * @returns
 */
export const RecommendationDialog = ({ open, onClose, request }) => {
  const { session, showLogin } = useAuthSession();

  const [recommendation, setRecommendation] = useState(null);
  const createRecommendation = usePostRecommendation(request?.id);

  const onSubmit = () => {
    if (!recommendation) return;

    createRecommendation.mutate(recommendation, {
      onSuccess: () => {
        setRecommendation(null);
        onClose();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => {
        setRecommendation(null);
        onClose();
      }}
      maxWidth="md"
      fullWidth
      scroll="body"
    >
      <DialogContent>
        <RecommendationForm
          requestType={request.requestType}
          onSubmit={setRecommendation}
          disabled={Boolean(recommendation)}
        />

        <Zoom in={Boolean(recommendation)}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <IFramely html={recommendation?.html} />
            <IconButton onClick={() => setRecommendation(null)}>
              <CancelOutlinedIcon />
            </IconButton>
          </Box>
        </Zoom>
      </DialogContent>
      <DialogActions>
        {createRecommendation.isPending && <CircularProgress />}
        {!createRecommendation.isPending && (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                setRecommendation(null);
                onClose();
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (!session?.loggedIn) {
                  showLogin();
                  return;
                }
                onSubmit();
              }}
            >
              <LocalDrinkOutlinedIcon />
              (5 Piasse)
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
