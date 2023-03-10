import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const RefineWithLayout = (Story) => (
    <MemoryRouter>
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            resources={[
                {
                    name: "posts",
                    list: Story,
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
    </MemoryRouter>
);

export const RefineWithoutLayout = (Story) => (
    <MemoryRouter>
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            resources={[
                {
                    name: "posts",
                    list: "/posts",
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
    </MemoryRouter>
);
