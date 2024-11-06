import {
  Divider,
  Button,
  Box,
  Zoom,
  Fade,
  Grid,
  IconButton,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";
import { FormText } from "../../form/FormText";
import { useForm } from "react-hook-form";
import { useEmbed } from "../../../hooks/api/embed/useEmbed";
import { IFramely } from "../IFramely";
import { FormLink } from "../../form/FormLink";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { SearchRecommendation } from "./SearchRecommendation";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const RecommendationForm = forwardRef(
  ({ requestType, onSubmit }, ref) => {
    const { control, reset, watch, handleSubmit } = useForm({
      defaultValues: {
        url: "",
        field1: "",
        field2: "",
        html: "",
      },
    });

    const url = watch("url");
    const html = watch("html");

    const { data: embed } = useEmbed(url);

    const [showLinkInput, setShowLinkInput] = useState(false);

    useImperativeHandle(ref, () => ({
      submit: handleSubmit(onSubmit),
    }));

    useEffect(() => {
      if (embed) {
        reset({
          field1: embed.title,
          field2: embed.author,
          html: embed.html,
          url: embed.url,
        });
      }
    }, [embed, reset]);

    return (
      <form>
        <Fade in={showLinkInput} mountOnEnter unmountOnExit>
          <Grid
            container
            aria-label="form-link-container"
            spacing={1}
            alignItems="center"
          >
            <Grid item xs={1}>
              <IconButton
                onClick={() => setShowLinkInput(false)}
                sx={{
                  border: "2px solid red",
                }}
              >
                <CancelOutlinedIcon color="red" />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <FormLink control={control} name="url" label="Paste your link" />
            </Grid>
          </Grid>
        </Fade>
        <Fade in={!showLinkInput} mountOnEnter unmountOnExit>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <SearchRecommendation
              requestType={requestType}
              onValueChange={(value) => {
                reset({
                  field1: value.field1,
                  field2: value.field2,
                  field3: value.field3,
                  html: value.html,
                  duplicate_from: value.id,
                });
              }}
            />

            <Button variant="contained" onClick={() => setShowLinkInput(true)}>
              +
            </Button>
          </Box>
        </Fade>

        <Zoom in={Boolean(html)} unmountOnExit mountOnEnter>
          <Stack aria-label="recommendation-container">
            <IFramely html={html} />
            <Accordion
              elevation={0}
              sx={{
                width: "100%",
              }}
            >
              <AccordionSummary>Details</AccordionSummary>
              <AccordionDetails>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      Title
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography noWrap>{embed?.title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      Author
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography noWrap>{embed?.author}</Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Zoom>
      </form>
    );
  }
);
RecommendationForm.displayName = "RecommendationForm";
