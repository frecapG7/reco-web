import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { FormText } from "../../components/form/FormText";
import { useForm } from "react-hook-form";
import { FormSelect } from "../../components/form/FormSelect";
import { FormUpload } from "../../components/form/FormUpload";
import { FormNumber } from "../../components/form/FormNumber";

export const AddMarketItem = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            my: 5,
          }}
        >
          <Typography variant="title" textAlign="center">
            Add Market Item
          </Typography>

          <Typography variant="subtitle1" textAlign="justify">
            The created item will be available in the market
          </Typography>
        </Box>
        <Paper
          sx={{
            padding: 5,
            marginTop: 2,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormSelect
                control={control}
                options={[
                  { value: "TITLE", label: "User titles" },
                  { value: "AVATAR", label: "Avatar" },
                  { value: "3", label: "Category 3" },
                ]}
                name="category"
                label="Category"
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormUpload
                control={control}
                name="image"
                label="Image"
                required
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormText
                control={control}
                name="name"
                label="Item name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormNumber
                control={control}
                name="price"
                label="Price"
                required
                rules={{
                  min: 1,
                  max: 100,
                }}
                suffix={"$"}
              />
            </Grid>

            <Grid item xs={12}>
              <FormText
                control={control}
                name="description"
                label="Description"
                multiline
                rows={10}
                required
              />
            </Grid>
          </Grid>
        </Paper>

        <Box
          align="center"
          sx={{
            mt: 5,
          }}
        >
          <Button variant="contained" color="secondary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};
