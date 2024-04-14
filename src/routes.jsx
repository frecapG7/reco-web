import { CreateRequest } from "./page/CreateRequest";
import { ManageAccount } from "./page/ManageAccount";
import { RequestDetails } from "./page/RequestDetails";
import { LoginScreen } from "./page/LoginScreen";
import { AuthLayout } from "./layout/AuthLayout";
import { StandardLayout } from "./layout/StandardLayout";
import { MyRequests } from "./page/MyRequests";
import { TrendingRequestScreen } from "./page/TrendingRequestScreen";
import { Outlet } from "react-router-dom";
import { Home } from "./home/Home";
import { UserAdministration } from "./admin/UserAdministration";

export const routes = [
  {
    path: "/",
    element: (
      <StandardLayout>
        <Outlet />
      </StandardLayout>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "administration",
        children: [
          {
            path: "users",
            element: <UserAdministration />,
          },
        ],
      },
    ],
  },
  {
    path: "/requests",
    children: [
      {
        path: "",
        element: (
          <AuthLayout>
            <TrendingRequestScreen />
          </AuthLayout>
        ),
      },
      {
        path: ":id",
        element: <RequestDetails />,
      },
      {
        path: "new",
        element: <CreateRequest />,
      },
    ],
  },
  {
    path: "my",
    children: [
      {
        path: "requests",
        element: <MyRequests />,
      },
      {
        path: "settings",
        element: <ManageAccount />,
      },
    ],
  },
  {
    path: "login",
    element: (
      <StandardLayout>
        <LoginScreen />
      </StandardLayout>
    ),
  },
];
