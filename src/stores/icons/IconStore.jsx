import {
  Box,
  Button,
  Container,
  Dialog,
  Fade,
  Grid,
  Typography,
} from "@mui/material";
import { IconItemCard } from "../components/IconItemCard";
import { useMemo, useState } from "react";

import { IconFilters } from "./components/IconFilters";
import { useSearchIconItems } from "../../hooks/api/market/useIconsStore";
import { useForm, useWatch } from "react-hook-form";
import { IconItemDetails } from "../components/IconItemDetails";

export const IconStore = () => {
  const { control, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const filters = useWatch({
    control,
  });

  const { data, isLoading, hasNextPage, fetchNextPage } = useSearchIconItems(
    filters?.search
  );

  const icons = useMemo(
    () => data?.pages?.flatMap((page) => page.results),
    [data]
  );

  const [selectedItem, setSelectedItem] = useState(null);

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
          <Grid container spacing={4}>
            {data?.pages
              ?.flatMap((page) => page?.results)
              .map((item, index) => (
                <Grid key={index} item xs={12} sm={3}>
                  <IconItemCard
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                </Grid>
              ))}
          </Grid>
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

      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        fullWidth
        maxWidth="md"
      >
        <IconItemDetails item={selectedItem} />
      </Dialog>
    </Container>
  );
};
