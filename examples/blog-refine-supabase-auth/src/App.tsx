import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "utility";
import authProvider from "./authProvider";
import { Countries } from "pages/Countries";
import { Layout } from "pages/Layout";
import "./App.css";
import { LoginPage } from "pages/Login";

function App() {
    return (
        <>
            <GitHubBanner />
            <Refine
                legacyRouterProvider={{
                    ...routerProvider,
                }}
                dataProvider={dataProvider(supabaseClient)}
                legacyAuthProvider={authProvider}
                resources={[{ name: "countries", list: Countries }]}
                LoginPage={LoginPage}
                Layout={Layout}
            />
        </>
    );
}
export default App;
