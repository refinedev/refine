import { Refine, Resource } from "@pankod/refine";

import "@pankod/refine/dist/styles.min.css";
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
      routes={[
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
      ]}
    >
      <Resource
        name="movies"
        list={AdminMovieList}
        create={AdminMovieCreate}
        show={AdminMovieShow}
        edit={AdminMovieEdit}
        options={{
          route: "admin/movies",
        }}
      />
    </Refine>
  );
}

export default App;
