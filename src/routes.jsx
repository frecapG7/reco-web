import { CreateRequest } from "./page/CreateRequest";
import { ManageAccount } from "./page/ManageAccount";
import { RequestDetails } from "./page/RequestDetails";
import { AuthLayout } from "./layout/AuthLayout";
import { StandardLayout } from "./layout/StandardLayout";
import { MyRequests } from "./page/MyRequests";
import { TrendingRequestScreen } from "./page/TrendingRequestScreen";
import { Outlet } from "react-router-dom";
import { Home } from "./home/Home";
import { UsersAdministration } from "./admin/users/UsersAdministration";
import { UserDetails } from "./admin/users/UserDetails";
import { MarketItemsAdministration } from "./admin/market/MarketItemsAdministration";
import { MarketItemDetails } from "./admin/market/MarketItemDetails";
import { AddMarketItem } from "./admin/market/AddMarketItem";
import { Login } from "./login/Login";

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
            children: [
              {
                path: "",
                element: <UsersAdministration />,
              },
              {
                path: ":id",
                element: <UserDetails />,
              },
            ],
          },
          {
            path: "market",
            children: [
              {
                path: "new",
                element: <AddMarketItem />,
              },
              {
                path: ":id",
                element: <MarketItemDetails />,
              },
              {
                path: "",
                element: <MarketItemsAdministration />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
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
];
