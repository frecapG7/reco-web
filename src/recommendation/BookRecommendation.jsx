import { Box, Grid } from "@mui/material";
import { FormText } from "../form/FormText";



export const BookRecommendation = ({ recommendation }) => {

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    Title
                </Grid>
                <Grid item xs={12} sm={6}>
                    {recommendation.field1}
                </Grid>

                <Grid item xs={12} sm={6}>
                    Author
                </Grid>
                <Grid item xs={12} sm={6}>
                    {recommendation.field2}
                </Grid>
            </Grid>
        </Box>
    );
}


export const BookRecommendationForm = ({ control }) => {


    return (
        <Grid container spacing={2}>
            {/* Test field for field1 is Title */}
            <Grid item xs={12}>
                <FormText name="field1"
                    label="Title"
                    control={control}
                    rules={{ required: true }}
                />
            </Grid>
            {/* Test field for field2 is Author */}
            <Grid item xs={12}>
                <FormText name="field2"
                    label="Author"
                    control={control}
                    rules={{ required: true }}
                />
            </Grid>
            {/* Test field for field3 is an optionnal text area */}
            <Grid item xs={12}>
                <FormText name="field3"
                    label="Description"
                    control={control}
                    placeholder="Make me wanna try it"
                    multiline
                    rows={4}
                />
            </Grid>
        </Grid>
    );

}