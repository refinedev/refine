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
                        element: <HomePage />,
                        path: "/",
                        layout: true,
                    },
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
                    {
                        element: <ProfilePage />,
                        path: "/profile",
                        layout: true,
                    },
                    {
                        element: <SettingsPage />,
                        path: "/settings",
                        layout: true,
                    },
                ],
            }}
            dataProvider={dataProvider(axiosInstance)}
            authProvider={authProvider(axiosInstance)}
            // TODO: fix me
            resources={[{ name: "home", list: HomePage }]}
            Layout={Layout}
        />
    );
}

export default App;
