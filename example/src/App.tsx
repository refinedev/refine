import React from "react";

import { Admin, Resource, AuthProvider, JsonServer } from "readmin";

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

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={JsonServer("https://readmin-fake-rest.pankod.com")}
        >
            <Resource name="posts" />
            <Resource name="categories" />
            <Resource name="users" />
        </Admin>
    );
};

export default App;
