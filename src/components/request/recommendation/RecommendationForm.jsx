import {
  CircularProgress,
  Divider,
  Grid,
  Grow,
  Slide,
  Collapse,
  Typography,
} from "@mui/material";
import { FormText } from "../../form/FormText";
import { useForm } from "react-hook-form";
import { useEmbed } from "../../../hooks/api/embed/useEmbed";
import { IFramely } from "../IFramely";
import { FormLink } from "../../form/FormLink";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { SearchRecommendation } from "./SearchRecommendation";

export const RecommendationForm = forwardRef(({ onSubmit }, ref) => {
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

  const { data: embed, isLoading } = useEmbed(url);

  const [editLink, setEditLink] = useState(!embed);

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
      setEditLink(false);
    }
  }, [embed, reset, setEditLink]);

  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Grid item xs={12}>
        <SearchRecommendation
          control={control}
          name="search"
          label="Search"
          requestType="BOOK"
          onValueChange={(value) => {
            setEditLink(false);
            reset({
              field1: value.field1,
              field2: value.field2,
              field3: value.field3,
              html: value.html,
              duplicate_from: value.id,
            });
          }}
        />
      </Grid>

      <Grow in={editLink} timeout={1000} unmountOnExit>
        <Grid item container aria-label="link-input-container">
          <Grid item xs={12}>
            <Typography variant="h6">
              Paste your link from any website
            </Typography>
          </Grid>

          <Slide
            in={isLoading}
            direction="down"
            timeout={1000}
            unmountOnExit
            mountOnEnter
          >
            <Grid item xs={12} alignItems="center">
              <CircularProgress />
            </Grid>
          </Slide>

          <Slide in={!isLoading} direction="up" timeout={1000} unmountOnExit>
            <Grid item xs={12}>
              <FormLink control={control} name="url" label="Paste your link" />
            </Grid>
          </Slide>
        </Grid>
      </Grow>

      <Grow in={!editLink} timeout={1000} unmountOnExit>
        <Grid item container>
          <Grid item xs={12}>
            <FormText
              control={control}
              name="field1"
              label="Title"
              disabled
              rules={{ required: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormText control={control} name="field2" label="Author" disabled />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Collapse in={false}>
            <Grid item xs={12}>
              Toto
            </Grid>
          </Collapse>

          {html && (
            <Grid item xs={12}>
              <IFramely html={html} />
            </Grid>
          )}
        </Grid>
      </Grow>
    </Grid>
  );
});
RecommendationForm.displayName = "RecommendationForm";
