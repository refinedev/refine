import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function MaterialUIAuth() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router-v6": "latest",
        "@refinedev/mui": "5.0.0",
        "react-router-dom": "^6.8.1",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "latest",
        "@mui/x-data-grid": "^7.22.2",
      }}
      startRoute="/login"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Authenticated, Refine } from "@refinedev/core";
import {
    AuthPage,
    ErrorComponent,
    RefineThemes,
    ThemedLayoutV2,
} from "@refinedev/mui";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={RefineThemes.Blue}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    authProvider={{
                        check: async () => ({
                            authenticated: false,
                            redirectTo: "/login",
                        }),
                        login: async () => {
                            return {
                                success: false,
                            };
                        },
                        logout: async () => {
                            return {
                                success: false,
                            };
                        },
                        onError: async () => ({}),
                        getIdentity: async () => ({
                            id: 1,
                            name: "John Doe",
                            avatar: "https://i.pravatar.cc/300",
                        }),
                    }}
                    resources={[
                        {
                            name: "dashboard",
                            list: "/",
                        },
                    ]}
                    options={{ syncWithLocation: true }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/dashboard"
                                element={<div>Welcome</div>}
                            />
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="dashboard" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        type="login"
                                        wrapperProps={{
                                            style: {
                                                margin: "72px 0px",
                                                height: "max-content",
                                            },
                                        }}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <AuthPage
                                        type="register"
                                        wrapperProps={{
                                            style: {
                                                margin: "72px 0px",
                                                height: "max-content",
                                            },
                                        }}
                                    />
                                }
                            />
                            <Route
                                path="/forgot-password"
                                element={
                                    <AuthPage
                                        type="forgotPassword"
                                        wrapperProps={{
                                            style: {
                                                margin: "72px 0px",
                                                height: "max-content",
                                            },
                                        }}
                                    />
                                }
                            />
                            <Route
                                path="/update-password"
                                element={
                                    <AuthPage
                                        type="updatePassword"
                                        wrapperProps={{
                                            style: {
                                                margin: "72px 0px",
                                                height: "max-content",
                                            },
                                        }}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            element={
                                <Authenticated>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ThemeProvider>
        </BrowserRouter>
    );
}

`.trim();
