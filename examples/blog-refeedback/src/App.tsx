import { GitHubBanner, Refine } from "@refinedev/core";

import {
    notificationProvider,
    LoginPage,
    ErrorComponent,
} from "@refinedev/antd";

import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";
import { DataProvider } from "@refinedev/strapi";
import strapiAuthProvider from "authProvider";
import { Header, Layout, OffLayoutArea } from "components";

import { FeedbackList } from "./pages/FeedbackList";

import "styles/global.css";

function App() {
    const API_URL = "http://localhost:1337";

    const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
    const dataProvider = DataProvider(API_URL, axiosInstance);
    return (
        <>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider}
                legacyAuthProvider={authProvider}
                Header={Header}
                Layout={Layout}
                OffLayoutArea={OffLayoutArea}
                legacyRouterProvider={routerProvider}
                resources={[
                    {
                        name: "feedbacks",
                        list: FeedbackList,
                    },
                ]}
                notificationProvider={notificationProvider}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
            />
        </>
    );
}

export default App;
