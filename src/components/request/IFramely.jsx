import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const IFramely = ({ html }) => {
  const [innerHtml, setInnerHtml] = useState({
    __html: "<div/>",
  });

  useEffect(() => {
    if (html) setInnerHtml({ __html: html });
  }, [html, setInnerHtml]);

  useEffect(() => {
    window.iframely && window.iframely.load();
  }, []);

  return (
    <Box
      flexGrow={1}
      sx={
        {
          // borderRadius: "50px",
          // width: "100%",
        }
      }
    >
      <div dangerouslySetInnerHTML={innerHtml} />
    </Box>
  );
};
