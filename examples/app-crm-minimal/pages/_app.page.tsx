import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import { App, ConfigProvider } from "antd";

import { Layout } from "@components";

import { authProvider, dataProvider, liveProvider } from "@providers";
import { resources } from "@config/resources";

import "@refinedev/antd/dist/reset.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    };

    return (
        <ConfigProvider theme={RefineThemes.Blue}>
            <App>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    liveProvider={liveProvider}
                    notificationProvider={useNotificationProvider}
                    authProvider={authProvider}
                    resources={resources}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        liveMode: "auto",
                    }}
                >
                    {renderComponent()}
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </App>
        </ConfigProvider>
    );
}

export default MyApp;
