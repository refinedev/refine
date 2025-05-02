"use client";

import { Refine, ErrorComponent, Authenticated } from "@refinedev/core";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Toaster } from "@/registry/default/ui/sonner";
import { authProvider } from "./providers/auth";
import { notificationProvider } from "./providers/notification";
import { createDataProvider } from "./providers/data";
import { LoginForm } from "./components/login-form";
import { AppLayout } from "./components/layout";
import { PostsListPage } from "./routes/posts/list";
import { UsersListPage } from "./routes/users/list";
import { API_URL } from "./constants";
import {
  BellIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { HomePage } from "./routes/home";

export function BaseExample() {
  return (
    <BrowserRouter basename="/base-example">
      <Refine
        dataProvider={createDataProvider(API_URL)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "home",
            list: "/",
            icon: <HomeIcon />,
            meta: {
              label: "Home",
            },
          },
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
            clone: "/posts/clone/:id",
            icon: <FileIcon />,
          },
          {
            name: "users",
            list: "/users",
            icon: <UserIcon />,
          },
          {
            name: "settings",
            icon: <SettingsIcon />,
          },
          {
            name: "Directory",
            list: "/directory",
            icon: <FolderIcon />,
          },
          {
            name: "profile",
            list: "/profile",
            meta: {
              parent: "settings",
            },
          },
          {
            name: "notifications",
            list: "/notifications",
            icon: <BellIcon />,
            meta: {
              parent: "settings",
            },
          },
          {
            name: "finance",
            meta: {
              group: true,
            },
          },
          {
            name: "expenses",
            list: "/expenses",
            icon: <CreditCardIcon />,
            meta: {
              parent: "finance",
            },
          },
          {
            name: "income",
            list: "/income",
            icon: <DollarSignIcon />,
            meta: {
              parent: "finance",
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <AppLayout>
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <Outlet />
                </Authenticated>
              </AppLayout>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostsListPage />} />
            <Route path="/users" element={<UsersListPage />} />
            <Route path="/settings" element={<div>Settings List Page</div>} />
            <Route path="/profile" element={<div>Profile List Page</div>} />
            <Route
              path="/notifications"
              element={<div>Notifications List Page</div>}
            />
            <Route path="/finance" element={<div>Finance List Page</div>} />
            <Route path="/expenses" element={<div>Expenses List Page</div>} />
            <Route path="/income" element={<div>Income List Page</div>} />
            <Route path="/directory" element={<div>Directory List Page</div>} />
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<LoginForm />} />
          </Route>

          <Route
            element={
              <Authenticated key="catch-all">
                <Outlet />
              </Authenticated>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>

        <Toaster />
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}
