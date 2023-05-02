import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { useDarkMode } from "storybook-dark-mode";
import { DarkTheme, LightTheme, ErrorComponent } from "@refinedev/mui";
import { ThemeProvider } from "@mui/material/styles";

import { authProvider } from "../src/authProvider";

export const parameters = {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: (a, b) =>
            a[1].kind === b[1].kind
                ? 0
                : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
};

export const RefineWithLayout = (Story) => (
    <MemoryRouter>
        <ThemeProvider theme={useDarkMode() ? DarkTheme : LightTheme}>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                authProvider={authProvider}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "CMS",
                    },
                    {
                        name: "posts",
                        list: "/posts",
                        meta: {
                            parent: "CMS",
                        },
                    },
                ]}
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route index element={<NavigateToResource />} />

                        <Route path="posts">
                            <Route index element={<Story />} />
                        </Route>
                    </Route>
                </Routes>
            </Refine>
        </ThemeProvider>
    </MemoryRouter>
);

export const RefineWithoutLayout = (Story) => (
    <MemoryRouter>
        <ThemeProvider theme={useDarkMode() ? DarkTheme : LightTheme}>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                authProvider={authProvider}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "CMS",
                    },
                    {
                        name: "posts",
                        list: "/posts",
                        meta: {
                            parent: "CMS",
                        },
                    },
                ]}
            >
                <Routes>
                    <Route index element={<NavigateToResource />} />

                    <Route path="posts">
                        <Route index element={<Story />} />
                    </Route>
                </Routes>
            </Refine>
        </ThemeProvider>
    </MemoryRouter>
);
