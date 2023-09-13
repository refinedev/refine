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

dayjs.extend(relativeTime);

export const DevToolsApp = () => {
    return (
        <DevToolsContextProvider __devtools>
            <ReloadOnChanges />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                key="app"
                                fallback={<Navigate to="/login" />}
                            >
                                <Outlet />
                            </Authenticated>
                        }
                    >
                        <Route
                            element={
                                <Onboarded
                                    fallback={<Navigate to="/onboarding" />}
                                >
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                </Onboarded>
                            }
                        >
                            <Route path="/" element={<Overview />} />
                            <Route path="/monitor" element={<Monitor />} />
                        </Route>
                        <Route
                            element={
                                <Onboarded fallback={<Outlet />}>
                                    <Navigate to="/" />
                                </Onboarded>
                            }
                        >
                            <Route
                                path="/onboarding"
                                element={<Onboarding />}
                            />
                        </Route>
                    </Route>
                    <Route
                        element={
                            <Authenticated key="gate" fallback={<Outlet />}>
                                <Navigate to="/" />
                            </Authenticated>
                        }
                    >
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DevToolsContextProvider>
    );
};
