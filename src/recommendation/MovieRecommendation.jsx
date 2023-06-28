import { Box, Grid } from "@mui/material"
import { FormText } from "../form/FormText";



export const MovieRecommendation = ({ recommendation }) => {


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
                    Director
                </Grid>
                <Grid item xs={12} sm={6}>
                    {recommendation.field2}
                </Grid>

                <Grid item xs={12} sm={6}>
                    Genre
                </Grid>
                <Grid item xs={12} sm={6}>
                    {recommendation.field3}
                </Grid>

            </Grid>
        </Box>
    )
}


export const MovieRecommendationForm = ({ control }) => {

    return (
        <Grid container>

            {/* Test field for field1 is Title */}
            <Grid item xs={12}>
                <FormText name="field1"
                    label="Title"
                    control={control}
                    rules={{ required: true }}
                />
            </Grid>

            {/* Test field for field2 is Director */}
            <Grid item xs={12}>

                <FormText name="field2"
                    label="Director"
                    control={control}
                    rules={{ required: true }}
                />
            </Grid>
            {/* Test field for field3 is Genre */}
            <Grid item xs={12}>

                <FormText name="field3"

                    label="Genre"
                    control={control}
                    rules={{ required: true }}
                />
            </Grid>
        </Grid>

    );

}