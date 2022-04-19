import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "./authProvider";

import { Layout } from "components";
import { LoginPage, RegisterPage } from "./pages/auth";
import { HomePage } from "pages/home";
import { ProfilePage } from "pages/profile";
import { SettingsPage } from "pages/settings";

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
            dataProvider={dataProvider("https://api.realworld.io/api")}
            authProvider={authProvider}
            // TODO: fix me
            resources={[{ name: "home", list: HomePage }]}
            Layout={Layout}
        />
    );
}

export default App;
