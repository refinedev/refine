import React from 'react';
import "@refinedev/antd/dist/reset.css";

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { MemoryRouterComponent } from "@refinedev/react-router-v6/legacy";




export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const RefineWithLayout = (Story) => (
  <Refine
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    legacyRouterProvider={{
      ...routerProvider,
      RouterComponent: MemoryRouterComponent,
    }}
    Layout={Layout}
    resources={[
      {
        name: "posts",
        list: Story,
      },
    ]}

  />
);

export const RefineWithoutLayout = (Story) => (
  <Refine
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    legacyRouterProvider={{
      ...routerProvider,
      RouterComponent: MemoryRouterComponent,
    }}
    resources={[
      {
        name: "posts",
        list: Story,
      },
    ]}

  />
);