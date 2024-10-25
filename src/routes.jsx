import { StandardLayout } from "./layout/StandardLayout";
import { Outlet } from "react-router-dom";
import { Home } from "./home/Home";
import { UsersAdministration } from "./admin/users/UsersAdministration";
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
import { AccountHome } from "./account/AccountHome";
import { AuthProtectedLayout } from "./layout/AuthProtectedLayout";
import { MyActivity } from "./account/my-activity/MyActivity";
import { AccountDetails } from "./account/details/AccountDetails";
import { AccountSettings } from "./account/settings/AccountSettings";
import { MyPurchases } from "./account/my-purchases/MyPurcharses";
import { PurchaseDetails } from "./account/my-purchases/PurchaseDetails";
import { AdminUserDetails } from "./admin/users/details/AdminUserDetails";
import { AdminUserDetailsPurchasesTab } from "./admin/users/details/AdminUserDetailsPurchasesTab";
import { AdminUserDetailsActivityTab } from "./admin/users/details/AdminUserDetailsActivityTab";
import { AdminUserDetailsTab } from "./admin/users/details/AdminUserDetailsTab";

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
                children: [
                  {
                    path: "",
                    element: <AdminUserDetailsTab />,
                  },
                  {
                    path: "activity",
                    element: <AdminUserDetailsActivityTab />,
                  },
                  {
                    path: "purchases",
                    element: <AdminUserDetailsPurchasesTab />,
                  },
                ],
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
        children: [
          {
            path: "",
            element: <AccountDetails />,
          },
          {
            path: "my-activity",
            element: <MyActivity />,
          },
          {
            path: "my-purchases",
            children: [
              {
                path: "",
                element: <MyPurchases />,
              },
              {
                path: ":id",
                element: <PurchaseDetails />,
              },
            ],
          },
          {
            path: "settings",
            element: <AccountSettings />,
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
    path: "sign-in",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
];
