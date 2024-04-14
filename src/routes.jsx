import { CreateRequest } from "./page/CreateRequest";
import Home from "./page/Home";
import { ManageAccount } from "./page/ManageAccount";
import { RequestDetails } from "./page/RequestDetails";
import { LoginScreen } from "./page/LoginScreen";
import { AuthLayout } from "./layout/AuthLayout";
import { StandardLayout } from "./layout/StandardLayout";
import { MyRequests } from "./page/MyRequests";
import { TrendingRequestScreen } from "./page/TrendingRequestScreen";
import { Outlet } from "react-router-dom";

export const routes = [
    {
        path: "/",
        element: <StandardLayout>
            <Outlet />
        </StandardLayout>,
        childre: [
            
        ]
    },
    {
        path: "/requests",
        children: [
            {
                path: "",
                element: <AuthLayout>
                    <TrendingRequestScreen />
                </AuthLayout>,
            },
            {
                path: ":id",
                element: <RequestDetails />
            },
            {
                path: "new",
                element: <CreateRequest />
            }
        ],
    },
    {
        path: "my",
        children: [
            {
                path: "requests",
                element: <MyRequests />
            },
            {
                path: "settings",
                element:<ManageAccount />
            }
        ]
    },
    {
        path: "login",
        element: <StandardLayout>
            <LoginScreen />
        </StandardLayout>
    }
];