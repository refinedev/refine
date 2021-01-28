import React from "react";

import { Admin, Resource, AuthProvider, List, JsonServer } from "readmin";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("username");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("username")
                ? Promise.resolve()
                : Promise.reject(),
        // getPermissions: () => Promise.reject("Unknown method"),
        userIdentity: () =>
            Promise.resolve({
                id: 1,
                fullName: "Jane Doe",
                avatar:
                    "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

    const CrudList = (props: any) => {
        return <List {...props} />;
    };

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={JsonServer("https://readmin-fake-rest.pankod.com")}
        >
            <Resource name="posts" list={CrudList} />
            <Resource name="categories" list={CrudList} />
            <Resource name="users" list={CrudList} />
        </Admin>
    );
};

export default App;
