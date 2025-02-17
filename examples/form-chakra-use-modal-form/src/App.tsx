import { GitHubBanner, Refine } from "@refinedev/core";
import {
  ErrorComponent,
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
} from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";

import { PostList } from "./pages";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => (
  <BrowserRouter>
    <GitHubBanner />
    <ChakraProvider theme={RefineThemes.Blue}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        notificationProvider={useNotificationProvider()}
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
            <Route index element={<NavigateToResource resource="posts" />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </ChakraProvider>
  </BrowserRouter>
);

export default App;
