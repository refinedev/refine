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
import { AuthContextProvider } from "./components/auth-context";
import { Monitor } from "./pages/monitor";

export const DevToolsApp = () => {
    return (
        <DevToolsContextProvider __devtools>
            <ReloadOnChanges />
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<Navigate to="/login" />}
                                >
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                </Authenticated>
                            }
                        >
                            <Route path="/" element={<Overview />} />
                            <Route path="/monitor" element={<Monitor />} />
                        </Route>
                        <Route element={<Outlet />}>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/onboarding"
                                element={<Onboarding />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </DevToolsContextProvider>
    );
};
