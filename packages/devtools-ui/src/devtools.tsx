import React from "react";
import { DevToolsContextProvider } from "@refinedev/devtools-shared";
import { ReloadOnChanges } from "./reload-on-changes";
import { Layout } from "./components/layout";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Authenticated } from "./components/authenticated";
import { Overview } from "./pages/overview";
import { Login } from "./pages/login";
import { Onboarding } from "./pages/onboarding";
import { Monitor } from "./pages/monitor";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Onboarded } from "./components/onboarded";
import { InitialLayout } from "./components/initial-layout";
import { RaffleHandler } from "./components/raffle-handler";
import { MonitorHighlightHandler } from "./components/monitor-highlight-handler";
import { LocationChangeHandler } from "./components/location-change-handler";
import { getLastLocation } from "./utils/last-location";
import { AfterLogin } from "./pages/after-login";

dayjs.extend(relativeTime);

export const DevToolsApp = () => {
  return (
    <DevToolsContextProvider __devtools>
      <ReloadOnChanges />
      <BrowserRouter>
        <Routes>
          <Route
            path="/after-login"
            element={
              <InitialLayout>
                <AfterLogin />
              </InitialLayout>
            }
          />
          <Route
            element={
              <Authenticated key="app" fallback={<Navigate to="/login" />}>
                <Outlet />
              </Authenticated>
            }
          >
            <Route
              element={
                <Onboarded
                  key="onboarded"
                  fallback={<Navigate to="/onboarding" />}
                >
                  <Layout>
                    <Outlet />
                    <RaffleHandler />
                  </Layout>
                </Onboarded>
              }
            >
              <Route path="/" element={<Navigate to={getLastLocation()} />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/monitor" element={<Monitor />} />
              <Route path="*" element={<Navigate to="/overview" />} />
            </Route>
            <Route
              element={
                <Onboarded
                  key="onboarding"
                  fallback={
                    <InitialLayout>
                      <Outlet />
                    </InitialLayout>
                  }
                >
                  <Navigate to="/overview" />
                </Onboarded>
              }
            >
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="*" element={<Navigate to="/overview" />} />
            </Route>
          </Route>
          <Route
            element={
              <Authenticated
                key="gate"
                fallback={
                  <InitialLayout>
                    <Outlet />
                  </InitialLayout>
                }
              >
                <Navigate to="/overview" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
        <LocationChangeHandler />
        <MonitorHighlightHandler />
      </BrowserRouter>
    </DevToolsContextProvider>
  );
};
