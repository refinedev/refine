import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { GitHubBanner, type HttpError, Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  ErrorComponent,
  useNotificationProvider,
  RefineThemes,
} from "@refinedev/mantine";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <MantineProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={{
            ...dataProvider("https://api.fake-rest.refine.dev"),

            // this is demonstration of how you can handle errors from API
            update: async () => {
              const error: HttpError = {
                message: "An error occurred while updating the record.",
                statusCode: 400,
                errors: {
                  title: ["Title is required."],
                  "category.id": ["Category is required."],
                  status: ["Status is required."],
                  content: {
                    key: "form.error.content",
                    message: "Content is required.",
                  },
                  tags: ["Tags is required."],
                },
              };

              return Promise.reject(error);
            },
            create: async () => {
              // this is demonstration of how you can handle errors from API
              const error: HttpError = {
                message: "An error occurred while creating the record.",
                statusCode: 400,
                errors: {
                  title: ["Title is required."],
                  "category.id": ["Category is required."],
                  status: ["Status is required."],
                  content: {
                    key: "form.error.content",
                    message: "Content is required.",
                  },
                  tags: ["Tags is required."],
                },
              };
              return Promise.reject(error);
            },
          }}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              meta: {
                canDelete: true,
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
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        <Notifications />
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
