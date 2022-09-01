import React from 'react';
import "@pankod/refine-antd/dist/styles.min.css";

import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider, { MemoryRouterComponent } from "@pankod/refine-react-router-v6";




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
    routerProvider={{
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
    options={{ disableTelemetry: true }}
  />
);

export const RefineWithoutLayout = (Story) => (
  <Refine
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    routerProvider={{
      ...routerProvider,
      RouterComponent: MemoryRouterComponent,
    }}
    resources={[
      {
        name: "posts",
        list: Story,
      },
    ]}
    options={{ disableTelemetry: true }}
  />
);