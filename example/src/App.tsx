import React from "react";

import { Admin, Resource } from "readmin";

const App: React.FC = () => {
    const authProvider = {
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
        <Admin authProvider={authProvider}>
            <Resource name="posts" />
            <Resource name="users" />
        </Admin>
    );
};

export default App;
