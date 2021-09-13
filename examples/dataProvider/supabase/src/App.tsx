import { Refine, Resource, AuthProvider } from "@pankod/refine";
import { dataProvider } from "@pankod/refine-supabase";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";
import { supabaseClient } from "utility";

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const { user, error } = await supabaseClient.auth.signIn({
            email,
            password,
        });

        if (error) {
            return Promise.reject(error);
        }

        if (user) {
            return Promise.resolve();
        }
    },
    logout: async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return Promise.reject(error);
        }

        return Promise.resolve("/");
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const session = supabaseClient.auth.session();

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: async () => {
        const user = supabaseClient.auth.user();

        if (user) {
            return Promise.resolve(user.role);
        }
    },
    getUserIdentity: async () => {
        const user = supabaseClient.auth.user();

        if (user) {
            return Promise.resolve({
                ...user,
                name: user.email,
            });
        }
    },
};

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            LoginPage={Login}
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Refine>
    );
};

export default App;
