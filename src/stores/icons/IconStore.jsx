import { Box, Button, Container, Fade, Typography } from "@mui/material";
import { useMemo } from "react";

import { IconFilters } from "./components/IconFilters";
import { useSearchIconItems } from "../../hooks/api/market/useIconsStore";
import { useForm, useWatch } from "react-hook-form";
import { IconItemList } from "../components/IconItemList";
import { useNavigate } from "react-router-dom";

export const IconStore = () => {
  const { control, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const filters = useWatch({
    control,
  });

  const { data, hasNextPage, fetchNextPage } = useSearchIconItems(
    filters?.search,
    10
  );

  const icons = useMemo(
    () => data?.pages?.flatMap((page) => page.results),
    [data]
  );

  const navigate = useNavigate();

  return (
    <Container>
      <Box
        aria-label="search"
        sx={{
          my: 5,
        }}
      >
        <IconFilters control={control} setValue={setValue} />
      </Box>

      <Fade in={icons?.length == 0} mountOnEnter unmountOnExit>
        <Box aria-label="no-content" align="center">
          <Typography variant="h4">No results</Typography>
        </Box>
      </Fade>

      <Fade in={icons?.length > 0} mountOnEnter unmountOnExit>
        <Box aria-label="content">
          <IconItemList icons={icons} onClick={(item) => navigate(item.id)} />

          <Fade in={hasNextPage} mountOnEnter unmountOnExit>
            <Box align="center" mt={5}>
              <Button
                variant="contained"
                color="primary"
                onClick={fetchNextPage}
              >
                Show more
              </Button>
            </Box>
          </Fade>
        </Box>
      </Fade>
    </Container>
  );
};
