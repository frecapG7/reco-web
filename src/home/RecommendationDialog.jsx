import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { RecommendationForm } from "../components/request/recommendation/RecommendationForm";
import { useRef } from "react";

import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import { usePostRecommendation } from "../hooks/api/requests/useRecommendations";

/**
 * Use this dialog to create new Recommendation
 * @param {*} param0
 * @returns
 */
export const RecommendationDialog = ({ open, onClose, request }) => {
  const formRef = useRef();

  const createRecommendation = usePostRecommendation(request.id);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    createRecommendation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth scroll="body">
      <DialogTitle>Provide your freshest drink</DialogTitle>

      <DialogContent>
        <RecommendationForm ref={formRef} onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        {createRecommendation.isPending && <CircularProgress />}
        {!createRecommendation.isPending && (
          <Button variant="contained" onClick={() => formRef.current?.submit()}>
            <LocalDrinkOutlinedIcon />
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
