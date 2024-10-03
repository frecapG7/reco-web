import { StandardLayout } from "./layout/StandardLayout";
import { Outlet } from "react-router-dom";
import { Home } from "./home/Home";
import { UsersAdministration } from "./admin/users/UsersAdministration";
import { AdminUserDetails } from "./admin/users/AdminUserDetails";
import { MarketItemsAdministration } from "./admin/market/MarketItemsAdministration";
import { MarketItemDetails } from "./admin/market/MarketItemDetails";
import { AddMarketItem } from "./admin/market/AddMarketItem";
import { Login } from "./login/Login";
import { CreateRequest } from "./request/CreateRequest";
import { User } from "./users/User";
import { Signup } from "./signup/Signup";
import { Notifications } from "./notifications/Notifications";
import { StoresHome } from "./stores/StoresHome";
import { IconStore } from "./stores/icons/IconStore";
import { UserSettings } from "./settings/UserSettings";
import { AccountHome } from "./account/AccountHome";
import { AuthProtectedLayout } from "./layout/AuthProtectedLayout";

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
                element: <AdminUserDetails />,
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
        path: "requests",
        children: [
          {
            path: "new",
            element: <CreateRequest />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: ":id",
            element: <User />,
          },
        ],
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "settings",
        element: <UserSettings />,
      },
      {
        path: "stores",
        children: [
          {
            path: "",
            element: <StoresHome />,
          },
          {
            path: "icons",
            element: <IconStore />,
          },
        ],
      },
      {
        path: "account",
        element: (
          <AuthProtectedLayout>
            <AccountHome />
          </AuthProtectedLayout>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "sign-in",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
];
