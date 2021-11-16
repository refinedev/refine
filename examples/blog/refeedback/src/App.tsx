import { Refine } from "@pankod/refine";

import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";
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
        />
    );
}

export default App;
