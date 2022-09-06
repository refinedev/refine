import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";
import { dataProvider } from "@pankod/refine-supabase";
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
            authProvider={authProvider}
            LoginPage={Login}
            routerProvider={{
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

                    options: {
                        route: "admin/movies",
                    },
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            options={{ disableTelemetry: true }}
        />
    );
}

export default App;
