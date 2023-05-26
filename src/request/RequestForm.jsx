import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSelect } from "../form/FormSelect";
import { FormText } from "../form/FormText";
import { DURATION, REQUEST_TYPE } from "../constants";
import { BookRecommendation } from "../recommendation/BookRecommendation";
import { Recommendation } from "../recommendation/Recommendation";




export const RequestForm = forwardRef(({ request, onSubmit }, ref) => {

    const { control, reset, watch, handleSubmit } = useForm();

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(onSubmit)
    }));



    useEffect(() => {
        reset(request);
    }, [request, reset]);

    const [viewTemplate, setViewTemplate] = useState(true);
    const requestType = watch("requestType");


    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormSelect name="requestType"
                        label="Request type"
                        control={control}
                        options={REQUEST_TYPE}
                        rules={{ required: true }} />
                </Grid>
                <Grid item xs={12}>
                    <FormSelect name="duration"
                        label="Duration"
                        control={control}
                        options={DURATION}
                        rules={{ required: true }} />
                </Grid>
                <Grid item xs={12}>
                    <FormText name="description"
                        control={control}
                        label="Description"
                        multiline
                        rows={5}
                        rules={{
                            required: false
                        }} />
                </Grid>
                {requestType &&
                    <Grid item xs={12}>
                        <Accordion expanded={viewTemplate}>
                            <AccordionSummary onClick={() => setViewTemplate(!viewTemplate)}>
                                <Typography variant="title">
                                    Recommendation template
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Recommendation
                                    requestType={requestType}
                                    recommendation={{
                                        field1: "Title",
                                        field2: "Author",
                                        field3: "Description"
                                    }} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                }

            </Grid>


        </form>
    )
});
