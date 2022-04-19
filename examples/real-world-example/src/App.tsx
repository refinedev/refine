import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import axios from "axios";

import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";

import { Layout } from "components";
import { LoginPage, RegisterPage } from "./pages/auth";
import { HomePage } from "pages/home";
import { ProfilePage } from "pages/profile";
import { SettingsPage } from "pages/settings";

const axiosInstance = axios.create();

function App() {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        element: <LoginPage />,
                        path: "/login",
                        layout: true,
                    },
                    {
                        element: <RegisterPage />,
                        path: "/register",
                        layout: true,
                    },
                ],
            }}
            dataProvider={dataProvider(axiosInstance)}
            authProvider={authProvider(axiosInstance)}
            DashboardPage={HomePage}
            resources={[
                { name: "profile", list: ProfilePage },
                { name: "settings", list: SettingsPage },
            ]}
            Layout={Layout}
        />
    );
}

export default App;
