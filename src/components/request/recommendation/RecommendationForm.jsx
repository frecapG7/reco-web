import {
  CircularProgress,
  Divider,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import { FormText } from "../../form/FormText";
import { useForm } from "react-hook-form";
import { useEmbed } from "../../../hooks/api/embed/useEmbed";
import { IFramely } from "../IFramely";
import { FormLink } from "../../form/FormLink";
import { forwardRef, useEffect, useImperativeHandle } from "react";

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
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Paste your link from any website</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <FormLink control={control} name="url" label="Use external link" />
        )}
      </Grid>

      <Grow in={embed} timeout={1000} unmountOnExit>
        <Grid item container>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormText
              control={control}
              name="field1"
              label="Title"
              rules={{ required: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormText
              control={control}
              name="field2"
              label="Author"
              disabled={true}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

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
