import { Box, Grid } from "@mui/material"



export const MovieRecommendation = ({recommendation}) => {


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
                <Grid   item xs={12} sm={6}> 
                    {recommendation.field2}
                </Grid>

                <Grid item xs={12} sm={6}>
                    Genre
                </Grid>
                <Grid   item xs={12} sm={6}> 
                    {recommendation.field3}
                </Grid>

            </Grid>
        </Box>
    )
}