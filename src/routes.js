import { CreateRequest } from "./page/CreateRequest";
import Home from "./page/Home";
import { ManageAccount } from "./page/ManageAccount";
import { RequestDetails } from "./page/RequestDetails";
import { Requests } from "./page/Requests";
import { Login } from "./page/Login";
import { AuthLayout } from "./layout/AuthLayout";
import { StandardLayout } from "./layout/StandardLayout";

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
                element: <AuthLayout>
                    <Requests />
                </AuthLayout>,
            },
            {
                path: ":id",
                element:
                    <AuthLayout>
                        <RequestDetails />
                    </AuthLayout>,
            },
            {
                path: "new",
                element: <AuthLayout>
                    <CreateRequest />
                </AuthLayout>
            }
        ],
    },
    {
        path: "my",
        children: [
            {
                path: "requests",
            },
            {
                path: "settings",
                element:
                    <AuthLayout>
                        <ManageAccount />
                    </AuthLayout>
            }
        ]
    },
    {
        path: "login",
        element: <StandardLayout>
            <Login />
        </StandardLayout>
    }
];