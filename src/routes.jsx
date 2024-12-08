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
import { AccountDetails } from "./account/details/AccountDetails";
import { AccountSettings } from "./account/settings/AccountSettings";
import { MyPurchases } from "./account/my-purchases/MyPurcharses";
import { PurchaseDetails } from "./account/my-purchases/PurchaseDetails";
import { AdminUserDetails } from "./admin/users/details/AdminUserDetails";
import { AdminUserDetailsPurchasesTab } from "./admin/users/details/AdminUserDetailsPurchasesTab";
import { AdminUserDetailsMetricsTab } from "./admin/users/details/AdminUserDetailsMetricsTab";
import { RequestDetails } from "./requests/RequestDetails";
import { AdminUserDetailsRequestsTab } from "./admin/users/details/AdminUserDetailsRequestsTab";
import { MyRequests } from "./account/my-requests/MyRequests";
import { UserDetailsRequestTab } from "./users/details/UserDetailsRequestTab";
import { AdminUserDetailsRecommendationsTab } from "./admin/users/details/AdminUserDetailsRecommendationsTab";
import { UserDetailsRecommendationsTab } from "./users/details/UserDetailsRecommendationsTab";
import { MyRecommendations } from "./account/my-recommendations/MyRecommendations";

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
                    element: <AdminUserDetailsMetricsTab />,
                  },
                  {
                    path: "requests",
                    element: <AdminUserDetailsRequestsTab />,
                  },
                  {
                    path: "recommendations",
                    element: <AdminUserDetailsRecommendationsTab />,
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
          {
            path: ":id",
            element: <RequestDetails />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: ":id",
            element: <User />,
            children: [
              {
                path: "",
                element: <UserDetailsRequestTab />,
              },
              {
                path: "recommendations",
                element: <UserDetailsRecommendationsTab />,
              },
            ],
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
            <Outlet />
          </AuthProtectedLayout>
        ),
        children: [
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
          {
            path: "",
            element: <AccountHome />,
            children: [
              {
                path: "my-metrics",
                element: <AccountDetails />,
              },
              {
                path: "my-requests",
                element: <MyRequests />,
              },
              {
                path: "my-recommendations",
                element: <MyRecommendations />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
    ],
  },
  {
    path: "sign-in",
    element: <Login />,
  },
];
