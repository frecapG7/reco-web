import { Box, IconButton } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useGetTrendingIconItems } from "../../hooks/api/market/useIconsStore";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { IconItemList } from "../components/IconItemList";
export const HomeIconItemList = () => {
  const { data } = useGetTrendingIconItems();

  const navigate = useNavigate();

  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <IconItemList
          icons={data?.results}
          onClick={(icon) => navigate(`./icons/${icon.id}`)}
        />
        <IconButton onClick={() => navigate("./icons")}>
          <AddCircleOutlinedIcon />
        </IconButton>
      </Box>
    </>
  );
};
