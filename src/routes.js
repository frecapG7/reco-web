import { CreateRequest } from "./page/CreateRequest";
import Home from "./page/Home";
import { Request } from "./page/Request";
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
                element: <Request />,
            },
            {
                path: "new",
                element: <CreateRequest />
            }
        ],
    },
];