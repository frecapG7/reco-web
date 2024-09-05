import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Zoom,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormSelect } from "../../components/form/FormSelect";
import { usePostItem } from "../../hooks/api/admin/useMarketAdministration";
import { MarketIcomForm } from "./forms/MarketIcomForm";
import { useRef } from "react";

const FormContent = ({ type, formRef, onSubmit }) => {
  switch (type) {
    case "ICON":
      return <MarketIcomForm onSubmit={onSubmit} ref={formRef} />;
    default:
      <></>;
  }
};

export const AddMarketItem = () => {
  const { control, watch } = useForm();
  const type = watch("type");

  const postItem = usePostItem();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    postItem.mutate(
      {
        type,
        data,
      },
      {
        onSuccess: () => {
          alert("Item created successfully");
        },
        onError: () => {
          alert("Error creating item");
        },
      }
    );
  };

  const formRef = useRef();

  return (
    <Container>
      <Box
        sx={{
          my: 5,
        }}
        aria-label="header"
      >
        <Box aria-label="form-header">
          <Typography variant="label">
            What type of market item do you want to create ?
          </Typography>
          <FormSelect
            control={control}
            options={[
              { value: "TITLE", label: "User titles" },
              { value: "ICON", label: "Users' avatar icons" },
            ]}
            name="type"
            required
          />
          <Alert severity="info">
            The created item will be available in the market
          </Alert>
        </Box>
      </Box>

      <Zoom in={type} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            p: 3,
            // backgroundColor: "primary.light",
          }}
        >
          <FormContent type={type} onSubmit={onSubmit} formRef={formRef} />
        </Paper>
      </Zoom>

      <Box
        align="center"
        sx={{
          mt: 5,
        }}
      >
        {!postItem.isPending && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => formRef.current?.submit()}
          >
            Save
          </Button>
        )}
        {postItem.isPending && <CircularProgress />}
      </Box>
    </Container>
  );
};
