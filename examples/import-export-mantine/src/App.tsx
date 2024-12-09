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

import { PostList } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MantineProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
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
              <Route path="/posts" element={<PostList />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <Notifications />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
