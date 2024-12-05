import {
  Box,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useGetTrendingIconItems } from "../../hooks/api/market/useIconsStore";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { IconItemList } from "../components/IconItemList";
export const HomeIconItemList = () => {
  const { data, isLoading } = useGetTrendingIconItems();

  const navigate = useNavigate();

  if (isLoading)
    return (
      <>
        <Stack direction="row" gap={2}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
      </>
    );

  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <IconItemList
          icons={data?.results}
          onClick={(item) => navigate(`./icons/${item.id}`)}
        />

        <IconButton onClick={() => navigate("./icons")}>
          <AddCircleOutlinedIcon />
        </IconButton>
      </Box>
    </>
  );
};
