import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import {
    AdminMovieList,
    AdminMovieCreate,
    AdminMovieShow,
    AdminMovieEdit,
} from "./pages/admin/movies";
import { MoviesList, MovieShow } from "./pages/movies";
import { Login } from "./pages/login";

function App() {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            legacyAuthProvider={authProvider}
            LoginPage={Login}
            legacyRouterProvider={{
                ...routerProvider,

                routes: [
                    {
                        exact: true,
                        component: MoviesList,
                        path: "/movies",
                    },
                    {
                        exact: true,
                        component: MovieShow,
                        path: "/:resource(movies)/:action(show)/:id",
                    },
                ],
            }}
            resources={[
                {
                    name: "movies",
                    list: AdminMovieList,
                    create: AdminMovieCreate,
                    show: AdminMovieShow,
                    edit: AdminMovieEdit,

                    meta: {
                        route: "admin/movies",
                    },
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
}

export default App;
