import { CreateRequest } from "./page/CreateRequest";
import Home from "./page/Home";
import { RequestDetails } from "./page/RequestDetails";
import { Requests } from "./page/Requests";

export const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/requests",
        children: [
            {
                path: "",
                element: <Requests />,
            },
            {
                path: ":id",
                element: <RequestDetails />,
            },
            {
                path: "new",
                element: <CreateRequest />
            }
        ],
    },
];