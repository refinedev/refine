import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CommonLayout } from "./components/layout";
import { VideoClubLayout } from "./routes/video-club/layout";
import { VideoClubPageBrowseTitles } from "./routes/video-club/titles";
import { HomePage } from "./components/home-page";
import { LoginPage } from "./components/login-page";
import { ThemeProvider } from "./providers/theme-provider";
import { authProvider } from "./providers/auth-provider";
import { notificationProvider } from "./providers/notification-provider";
import { supabaseClient } from "./supabase-client";
import { AboutWindow } from "./components/about-window";
import { VideoClubPageTitleDetails } from "./routes/video-club/titles/detail";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={routerProvider}
          notificationProvider={notificationProvider}
          resources={[
            {
              name: "titles",
              list: "/video-club/titles",
              show: "/video-club/titles/:id",
            },
          ]}
          options={{
            liveMode: "off",
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
                  <CommonLayout>
                    <Outlet />
                  </CommonLayout>
                </Authenticated>
              }
            >
              <Route index element={<HomePage />} />
              <Route
                path="/video-club"
                element={
                  <VideoClubLayout>
                    <Outlet />
                    <AboutWindow />
                  </VideoClubLayout>
                }
              >
                <Route
                  path="titles"
                  element={
                    <>
                      <VideoClubPageBrowseTitles />
                      <Outlet />
                    </>
                  }
                >
                  <Route index />
                  <Route path=":id" element={<VideoClubPageTitleDetails />} />
                </Route>
              </Route>
            </Route>

            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <Navigate to="/" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<LoginPage />} />
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
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
          <Toaster />
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
