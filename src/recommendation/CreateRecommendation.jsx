import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { usePostRecommendation } from "../api/recommendations"
import { RecommendationForm } from "./Recommendation";
import { useRef, useState } from "react";


export const CreateRecommendation = ({ request }) => {

    const [openCreate, setOpenCreate] = useState(false);
    const postRecommendation = usePostRecommendation(request.id);


    const formRef = useRef();

    const handleSubmit = (data) => {
        postRecommendation.mutate(data, {
            onSuccess: () => setOpenCreate(false)
        });
    }


    return (

        <>
            <Button variant="contained"
                onClick={() => setOpenCreate(true)}>
                Recommend
            </Button>



            <Dialog open={openCreate}
                maxWidth="md"
                fullWidth
                onClose={() => setOpenCreate(false)}>
                <DialogTitle>Create a recommendation</DialogTitle>
                <DialogContent>
                    <Box p={5}>

                        <RecommendationForm
                            ref={formRef}
                            requestType={request.requestType}
                            onSubmit={handleSubmit}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    {postRecommendation.isLoading ?
                        <CircularProgress /> :
                        <>
                            <Button variant="contained"
                                color="success"
                                onClick={() => formRef.current?.submit()}>
                                Recommend
                            </Button>
                            <Button variant="contained"
                                color="error"
                                onClick={() => setOpenCreate(false)} >
                                Cancel
                            </Button>
                        </>

                    }

                </DialogActions>
            </Dialog>

        </>

    );







}