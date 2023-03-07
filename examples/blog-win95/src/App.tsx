import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { dataProvider } from "@refinedev/supabase";
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
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider(supabaseClient)}
                legacyAuthProvider={authProvider}
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
            />
        </ThemeProvider>
    );
}

export default App;
