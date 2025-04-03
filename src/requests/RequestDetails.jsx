import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useGetRecommendations } from "../hooks/api/requests/useRecommendations";
import InfiniteScroll from "react-infinite-scroll-component";
import { IFramely } from "../components/request/IFramely";
import { LikeRecommendation } from "../components/recommendation/LikeRecommendation";
import useI18nTime from "../hooks/i18n/useI18nTime";
import CommentIcon from "@mui/icons-material/Comment";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { SortRecommendation } from "../components/recommendation/SortRecommendation";

export const RequestDetails = () => {
  const { request } = useOutletContext();

  const [sorting, setSorting] = useState({
    sort: "created_at",
    order: "desc",
  });
  const { relativeTime } = useI18nTime();

  const navigate = useNavigate();

  const { data, isLoading, refetch, fetchNextPage, hasNextPage } =
    useGetRecommendations(request.id, sorting.sort, sorting.order, 5);

  const recommendations = data?.pages.flatMap((page) => page.results) || [];

  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  return (
    <Stack spacing={2}>
      <Box>
        <div dangerouslySetInnerHTML={{ __html: request.description }} />
      </Box>

      <Box my={2} aria-label="request-recocos-container">
        <Stack spacing={2}>
          <Stack
            aria-label="recommendations-filters"
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <SortRecommendation sorting={sorting} setSorting={setSorting} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("add-recommendation")}
              endIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Raukaukau
            </Button>
          </Stack>

          {/* <Box aria-label="recommendations-list"> */}
          <InfiniteScroll
            dataLength={50}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<CircularProgress />}
            refreshFunction={refetch}
          >
            <Stack
              spacing={2}
              sx={{
                pl: { xs: 2, sm: 5 },
              }}
            >
              <Zoom in={isLoading} mountOnEnter unmountOnExit>
                <Card elevation={0}>
                  <CardHeader
                    avatar={
                      <Skeleton variant="circular" width={40} height={40} />
                    }
                    title={<Skeleton variant="text" width={100} />}
                    subheader={<Skeleton variant="text" width={50} />}
                    action={
                      <Box>
                        <Skeleton
                          variant="rectangular"
                          width={40}
                          height={40}
                        />
                      </Box>
                    }
                  />
                  <CardMedia>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                  </CardMedia>
                </Card>
              </Zoom>
              {recommendations.map((recommendation) => (
                <Card
                  key={recommendation.id}
                  elevation={0}
                  sx={{
                    width: "100%",
                  }}
                >
                  <CardHeader
                    avatar={<Avatar src={recommendation.user.avatar} />}
                    title={recommendation?.user.name}
                    subheader={relativeTime(recommendation?.created_at)}
                    action={
                      <Stack direction="row" spacing={1}>
                        <LikeRecommendation recommendation={recommendation} />
                        {Boolean(recommendation.note) && (
                          <IconButton
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              setSelectedRecommendation(recommendation)
                            }
                          >
                            <CommentIcon />
                          </IconButton>
                        )}
                      </Stack>
                    }
                  />
                  <CardMedia>
                    <IFramely html={recommendation.html} />
                  </CardMedia>
                </Card>
              ))}
            </Stack>
          </InfiniteScroll>
        </Stack>
      </Box>

      <Dialog
        open={Boolean(selectedRecommendation)}
        onClose={() => setSelectedRecommendation(null)}
        maxWidth="sm"
        scroll="paper"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#fff8b3",
              border: "1px solid #ffeb3b",
              borderRadius: "10px", // Coins arrondis
              boxShadow: "5px 5px 15px rgba(0,0,0,0.3)", // Ombre pour un effet 3D
            },
          },
        }}
      >
        <DialogTitle>
          {selectedRecommendation?.title} - {selectedRecommendation?.author}
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "inherit",
          }}
        >
          <Typography variant="body2" fontStyle="italic">
            {selectedRecommendation?.note}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSelectedRecommendation(null)}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
