import { GitHubBanner, Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  ErrorComponent,
  useNotificationProvider,
  RefineThemes,
} from "@refinedev/mantine";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

import { PostList } from "./pages";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <MantineProvider
        theme={RefineThemes.Blue}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
        <NotificationsProvider position="top-right">
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
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
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="posts" />}
                />
                <Route path="/posts" element={<PostList />} />
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </NotificationsProvider>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
