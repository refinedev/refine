import { Refine } from "@refinedev/core";

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
import { SubscriberList, CreateSubscriber } from "./pages/subscriber";
import { MessageList, MailCreate } from "./pages/mail";

function App() {
    const API_URL = "http://localhost:1337";

    const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
    const dataProvider = DataProvider(API_URL, axiosInstance);
    return (
        <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            Header={Header}
            Layout={Layout}
            OffLayoutArea={OffLayoutArea}
            legacyRouterProvider={routerProvider}
            resources={[
                {
                    name: "subscribers",
                    list: SubscriberList,
                    create: CreateSubscriber,
                },
                {
                    name: "messages",
                    list: MessageList,
                    create: MailCreate,
                },
            ]}
            notificationProvider={notificationProvider}
            LoginPage={LoginPage}
            catchAll={<ErrorComponent />}
        />
    );
}

export default App;
