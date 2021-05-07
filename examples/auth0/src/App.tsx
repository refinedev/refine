import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";
import { useAuth0 } from "@auth0/auth0-react";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://refine-fake-rest.pankod.com";

const App = () => {
    const {
        loginWithRedirect,
        isLoading,
        isAuthenticated,
        user,
        logout,
    } = useAuth0();

    console.log("isLoading", isLoading);
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);

    if (isLoading) {
        return <span>loding....</span>;
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    {JSON.stringify(user)}
                    <button onClick={() => logout()}>logout</button>
                </>
            ) : (
                <button onClick={() => loginWithRedirect()}>login</button>
            )}

            <Admin dataProvider={dataProvider(API_URL)}>
                <Resource
                    name="posts"
                    list={PostList}
                    create={PostCreate}
                    edit={PostEdit}
                    show={PostShow}
                />
            </Admin>
        </>
    );
};

export default App;
