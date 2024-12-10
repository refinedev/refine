import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { GitHubBanner, Refine } from "@refinedev/core";
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

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MantineProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
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
                <ThemedLayoutV2 Footer={GitHubBanner}>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />

              <Route path="posts">
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
