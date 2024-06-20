import { Divider, Button, Box, Zoom, Fade } from "@mui/material";
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

    const { data: embed, isLoading } = useEmbed(url);

    const [showLinkInput, setShowLinkInput] = useState(false);
    const [edit, setEdit] = useState(true);

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
        setEdit(false);
      }
    }, [embed, reset, setEdit]);

    return (
      <Box>
        <Zoom in={!html} appear={false} mountOnEnter unmountOnExit>
          <Box display="flex" justifyContent="center">
            <Fade in={showLinkInput} mountOnEnter unmountOnExit>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  sx={{
                    flexGrow: 1,
                  }}
                  variant="contained"
                  onClick={() => setShowLinkInput(false)}
                >
                  search
                </Button>
                <FormLink
                  sx={{
                    flexGrow: 4,
                  }}
                  control={control}
                  name="url"
                  label="Paste your link"
                />
              </Box>
            </Fade>
            <Fade in={!showLinkInput}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <SearchRecommendation
                  requestType={requestType}
                  onValueChange={(value) => {
                    setEdit(false);
                    reset({
                      field1: value.field1,
                      field2: value.field2,
                      field3: value.field3,
                      html: value.html,
                      duplicate_from: value.id,
                    });
                  }}
                />

                <Button
                  variant="contained"
                  onClick={() => setShowLinkInput(true)}
                >
                  +
                </Button>
              </Box>
            </Fade>
          </Box>
        </Zoom>

        <Zoom in={Boolean(html)} unmountOnExit mountOnEnter>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <Button
                sx={{
                  flexGrow: 1,
                }}
                variant="contained"
                onClick={() => reset({})}
              >
                <CancelOutlinedIcon />
              </Button>
              <FormText
                sx={{
                  flexGrow: 4,
                }}
                control={control}
                name="field1"
                label="Title"
                disabled
                rules={{ required: true }}
              />
            </Box>

            <Divider />

            <IFramely html={html} />
          </Box>
        </Zoom>
      </Box>
    );
  }
);
RecommendationForm.displayName = "RecommendationForm";
