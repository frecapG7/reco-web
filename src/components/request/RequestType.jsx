import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

export const RequestType = ({ requestType }) => {
  switch (requestType) {
    case "BOOK":
      return <MenuBookOutlinedIcon fontSize="large" />;
    case "SONG":
      return <AudiotrackOutlinedIcon fontSize="large" />;
    case "MOVIE":
      return <MovieOutlinedIcon fontSize="large" />;
    default:
      return null;
  }
};
