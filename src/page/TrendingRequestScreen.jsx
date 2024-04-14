import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';

import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useSearchRequests } from '../api/search';
import { CustomError } from '../layout/CustomError';
import { CustomProgress } from '../layout/CustomProgress';

const Content = ({ requests }) => {


    const navigate = useNavigate();

    const handleCommentClick = (request, e) => {
        e.stopPropagation()
        console.log(request.id);
    }


    if (requests?.length === 0)
        return (
            <Typography variant='body1'>No requests</Typography>
        );

    return (
        <Stack spacing={5}>
            {requests?.map((request) => (
                <Card key={request.id}>
                    <CardActionArea onClick={() => navigate(`${request.id}`)}>
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="author">
                                TODO
                            </Avatar>
                        }
                            action={<Typography>status</Typography>}
                            title={request.requestType}
                            subheader={request.created?.toLocaleString()}
                        >
                            TODO
                        </CardHeader>
                        <CardContent>
                            <Typography>
                                {request.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={(e) => handleCommentClick(request, e)}>
                                <CommentIcon /> {request.recommendationsCount}
                            </Button>
                            <Button variant="contained" onClick={() => console.log('comment')}>
                                <ShareIcon /> share
                            </Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
            ))
            }
        </Stack>
    );
}


export const TrendingRequestScreen = () => {

    const navigate = useNavigate();

    const { data: results, error, isLoading, isFetching, fetchNextPage, hasNextPage } = useSearchRequests({});


    if (isLoading)
        return (
            <CustomProgress />
        );


    if (error)
        return (
            <CustomError />
        );


    console.log(hasNextPage);

    return (
        <Container>
            <Container>
                <form>
                    <input type="text" placeholder="Search" />
                </form>
            </Container>
            <Container>
                <InfiniteScroll
                    dataLength={() => results.pages.reduces((total, page) => total + page.length, 0)}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    onScroll={() => {
                        if (hasNextPage) fetchNextPage()
                    }}
                    loader={<CustomProgress />}
                >
                    <Content requests={results.pages.flatMap((page) => page.results)} />

                    {hasNextPage &&
                        <Button variant="contained" onClick={fetchNextPage} >
                            Load more
                        </Button>
                    }

                    {isFetching && <CustomProgress />}
                </InfiniteScroll>



            </Container>



        </Container>
    )

}

