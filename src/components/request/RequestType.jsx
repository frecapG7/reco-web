import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import { Icon } from "@mui/material";

const RequestTypeIcon = ({ requestType }) => {
  switch (requestType) {
    case "BOOK":
      return <MenuBookRoundedIcon fontSize="large" color="secondary" />;
    case "SONG":
      return <AudiotrackOutlinedIcon fontSize="large" color="secondary" />;
    case "MOVIE":
      return <MovieOutlinedIcon fontSize="large" color="secondary" />;
    default:
      return null;
  }
};

export const RequestType = ({ requestType }) => {
  return (
    <Icon
      sx={{
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: "primary.light",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        border: 1,
      }}
    >
      <RequestTypeIcon requestType={requestType} />
    </Icon>
  );
};
