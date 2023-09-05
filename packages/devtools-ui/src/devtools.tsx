import React from "react";
import { DevToolsContextProvider } from "@refinedev/devtools-shared";
import { Overview } from "./overview";
import { ReloadOnChanges } from "./reload-on-changes";
import { Layout } from "./components/layout";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

export const DevToolsApp = () => {
    return (
        <DevToolsContextProvider __devtools>
            <ReloadOnChanges />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route path="/" element={<Overview />} />
                        <Route path="/monitor" element={<div>Monitor</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DevToolsContextProvider>
    );
};
