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
                path: "a",
                element: <h1>a</h1>,
            }
        ],
    },
];