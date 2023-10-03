import { Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Stack, Typography } from '@mui/material';

import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useSearchRequests } from '../api/search';
import { Request } from '../component/Request';
import { CustomError } from '../layout/CustomError';
import { CustomProgress } from '../layout/CustomProgress';


const Content = ({ requests }) => {


    const navigate = useNavigate();


    if (requests?.length === 0)
        return (
            <Typography variant='body1'>No requests</Typography>
        );

    return (
        <Stack spacing={5}>
            {requests?.map((request) => (
                <Card key={request.id}>
                    <CardActionArea>
                        <CardContent>
                            <Request request={request} />
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button>
                            TODO
                        </Button>
                        <Button>
                            TODO 2
                        </Button>
                    </CardActions>
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
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                Requests
            </Typography>
            <Box>
                Search
            </Box>
            <Container>
                {/* {results.pages.map(page =>
                    <Content requests={page.results} />)
                } */}
                <InfiniteScroll
                    dataLength={() => results.pages.reduces((total, page) => total + page.length, 0)}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    onScroll={() => {
                        if (hasNextPage) fetchNextPage()
                    }}
                    loader={<CustomProgress />}
                >
                    {results.pages.map((page, index) =>
                        <Fragment key={index}>
                            <Content requests={page.results} />
                        </Fragment>
                    )}

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

