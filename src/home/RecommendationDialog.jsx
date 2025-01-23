import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { RecommendationForm } from "../components/request/recommendation/RecommendationForm";
import { useRef } from "react";

import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import { usePostRecommendation } from "../hooks/api/requests/useRecommendations";
import { useTranslation } from "react-i18next";
import { useAuthSession } from "../context/AuthContext";
/**
 * Use this dialog to create new Recommendation
 * @param {*} param0
 * @returns
 */
export const RecommendationDialog = ({ open, onClose, request }) => {
  const formRef = useRef();

  const { session, showLogin } = useAuthSession();
  const createRecommendation = usePostRecommendation(request?.id);

  const onSubmit = (data) => {
    createRecommendation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body">
      <DialogContent>
        <RecommendationForm
          ref={formRef}
          onSubmit={onSubmit}
          requestType={request?.requestType}
        />
      </DialogContent>
      <DialogActions>
        {createRecommendation.isPending && <CircularProgress />}
        {!createRecommendation.isPending && (
          <>
            <Button variant="outlined" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (!session?.loggedIn) {
                  showLogin();
                  return;
                }
                formRef.current?.submit();
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
