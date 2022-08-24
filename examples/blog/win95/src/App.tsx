import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider } from "@pankod/refine-supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";

import { PostList, PostEdit, PostCreate } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/category";
import { LoginPage } from "pages/login";
import { Footer } from "./components/footer";

import "./app.css";

function App() {
    return (
        <ThemeProvider theme={original}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(supabaseClient)}
                authProvider={authProvider}
                LoginPage={LoginPage}
                Layout={({ children }) => {
                    return (
                        <div className="main">
                            <div className="layout">{children}</div>
                            <div>
                                <Footer />
                            </div>
                        </div>
                    );
                }}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                    {
                        name: "categories",
                        list: CategoryList,
                        create: CategoryCreate,
                        edit: CategoryEdit,
                    },
                ]}
                options={{ disableTelemetry: true }}
            />
        </ThemeProvider>
    );
}

export default App;
