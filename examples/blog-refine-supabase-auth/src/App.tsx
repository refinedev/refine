import {
  Authenticated,
  ErrorComponent,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility";
import authProvider from "./authProvider";
import { Countries } from "./pages/Countries";
import { Layout } from "./pages/Layout";
import "./App.css";
import { LoginPage } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(supabaseClient)}
        authProvider={authProvider}
        resources={[{ name: "countries", list: "/countries" }]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <Authenticated
                key="authenticated-routes"
                fallback={<CatchAllNavigate to="/login" />}
              >
                <Layout>
                  <Outlet />
                </Layout>
              </Authenticated>
            }
          >
            <Route
              index
              element={<NavigateToResource resource="countries" />}
            />
            <Route path="/countries" element={<Countries />} />
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="countries" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route
            element={
              <Authenticated key="catch-all">
                <Layout>
                  <Outlet />
                </Layout>
              </Authenticated>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}
export default App;
