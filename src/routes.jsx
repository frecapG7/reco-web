import { StandardLayout } from "./layout/StandardLayout";
import { Outlet } from "react-router-dom";
import { Home } from "./home/Home";
import { UsersAdministration } from "./admin/users/UsersAdministration";
import { MarketItemsAdministration } from "./admin/market/MarketItemsAdministration";
import { MarketItemDetails } from "./admin/market/MarketItemDetails";
import { AddMarketItem } from "./admin/market/AddMarketItem";
import { Login } from "./login/Login";
import { UserDetailsPage } from "./users/UserDetailsPage";
import { Signup } from "./signup/Signup";
import { Notifications } from "./notifications/Notifications";
import { StoresHome } from "./stores/StoresHome";
import { AccountHome } from "./account/AccountHome";
import { AuthProtectedLayout } from "./layout/AuthProtectedLayout";
import { AccountDetails } from "./account/details/AccountDetails";
import { MyPurchases } from "./account/my-purchases/MyPurcharses";
import { MyPurchasesDetails } from "./account/my-purchases/MyPurchasesDetails";
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
import { AdminUserDetailsPurchasesDetails } from "./admin/users/details/AdminUserDetailsPurchasesDetails";
import { MyKeys } from "./account/my-keys/MyKeys";
import { TokensAdministration } from "./admin/tokens/TokensAdministration";
import { CreateRequest } from "./requests/CreateRequest";
import { Settings } from "./settings/Settings";
import { NotificationSettings } from "./settings/NotificationSettings";
import { AccountSettings } from "./settings/AccountSettings";
import { PrivacySettings } from "./settings/PrivacySettings";
import { ForgotPassword } from "./login/ForgotPassword";
import { Redirection } from "./redirection/Redirection";
import { ResetPassword } from "./login/ResetPassword";
import { CreateRequestRecommendation } from "./requests/CreateRequestRecommendation";
import { RequestDetailsPage } from "./requests/RequestDetailsPage";
import { IconsStore } from "./stores/icons/IconsStore";
import { ProductDetails } from "./stores/ProductDetails";

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
                    children: [
                      {
                        path: "",
                        element: <AdminUserDetailsPurchasesTab />,
                      },
                      {
                        path: ":purchaseId",
                        element: <AdminUserDetailsPurchasesDetails />,
                      },
                    ],
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
          {
            path: "tokens",
            element: <TokensAdministration />,
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
            element: <RequestDetailsPage />,
            children: [
              {
                path: "add-recommendation",
                element: <CreateRequestRecommendation />,
              },
              {
                path: "",
                element: <RequestDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: ":id",
            element: <UserDetailsPage />,
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
            children: [
              {
                path: "",
                element: <IconsStore />,
              },
              {
                path: ":name",
                element: <ProductDetails />,
              },
            ],
          },
          {
            path: "consumables",
            children: [
              {
                path: ":name",
                element: <ProductDetails />,
              },
            ],
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
                path: ":id",
                element: <MyPurchasesDetails />,
              },
              {
                path: "",
                element: <MyPurchases />,
              },
            ],
          },
          {
            path: "my-keys",
            element: <MyKeys />,
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
        path: "settings",
        element: (
          <AuthProtectedLayout>
            <Settings />
          </AuthProtectedLayout>
        ),
        children: [
          {
            path: "notifications",
            element: <NotificationSettings />,
          },
          {
            path: "account",
            element: <AccountSettings />,
          },
          {
            path: "privacy",
            element: <PrivacySettings />,
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
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "redirection",
        element: <Redirection />,
      },
    ],
  },
  {
    path: "sign-in",
    element: <Login />,
  },
];
