import { Backdrop, Box, CircularProgress, Container } from "@mui/material";
import { usePostItem } from "../../hooks/api/admin/useMarketAdministration";
import { CreateMarketItem } from "./components/CreateMarketItem";

export const AddMarketItem = () => {
  const postItem = usePostItem();
  const onSubmit = (data) => {
    postItem.mutate(data, {
      onSuccess: () => {
        alert("Item created successfully");
      },
      onError: () => {
        alert("Error creating item");
      },
    });
  };

  return (
    <Container>
      <Box
        sx={{
          my: 5,
        }}
        aria-label="header"
      >
        <CreateMarketItem onSubmit={onSubmit} />
      </Box>
      <Backdrop in={postItem.isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
