import { Refine } from "@pankod/refine-core";

import {
    notificationProvider,
    LoginPage,
    ErrorComponent,
} from "@pankod/refine-antd";

import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";
import { DataProvider } from "@pankod/refine-strapi";
import strapiAuthProvider from "authProvider";
import { Header, Layout, OffLayoutArea } from "components";

import { FeedbackList } from "./pages/FeedbackList";

import "styles/global.css";

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
            routerProvider={routerProvider}
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
    );
}

export default App;
