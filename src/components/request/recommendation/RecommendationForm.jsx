import { Box, Zoom, Fade, IconButton, Tooltip } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

import { RecommendationDetails } from "../../recommendation/RecommendationDetails";
import { SearchLink } from "../../recommendation/SearchLink";
import { SearchRecommendations } from "../../recommendation/SearchRecommendations";

import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const RecommendationForm = forwardRef(
  ({ requestType, onSubmit }, ref) => {
    const [recommendation, setRecommendation] = useState(null);
    const [showLinkInput, setShowLinkInput] = useState(false);

    useImperativeHandle(ref, () => ({
      submit: () => onSubmit(recommendation),
    }));

    return (
      <form>
        <Fade in={showLinkInput} mountOnEnter unmountOnExit>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            aria-label="Search with Link"
          >
            <Tooltip title="Search with existing reco">
              <IconButton onClick={() => setShowLinkInput(false)}>
                <SearchOutlinedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <SearchLink onChange={(data) => setRecommendation(data)} />
          </Box>
        </Fade>
        <Fade in={!showLinkInput} mountOnEnter unmountOnExit>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            aria-label="Search with Recommendations"
          >
            <SearchRecommendations
              requestType={requestType}
              onChange={(data) => setRecommendation(data)}
            />
            <Tooltip title="Paste your own link">
              <IconButton onClick={() => setShowLinkInput(true)}>
                <ContentPasteOutlinedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>

        <Zoom in={Boolean(recommendation)} mountOnEnter unmountOnExit>
          <Box>
            <RecommendationDetails recommendation={recommendation} />
          </Box>
        </Zoom>
      </form>
    );
  }
);
RecommendationForm.displayName = "RecommendationForm";
