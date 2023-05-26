import { Grid } from "@mui/material";
import { forwardRef } from "react";


export const BookForm = forwardRef(({ book, onSubmit }, ref) => {


    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>
        </form>
    );


});