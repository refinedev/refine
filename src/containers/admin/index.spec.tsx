import React from "react";

import { ReadyPage } from "@pages";
import { Resource } from "@containers";

import {
    render,
    MockJSONServer,
} from "@test";

import { Admin } from "./index";

const mockAuthProvider = {
    login: (params: any) => {
        if (params.username === 'admin') {
            localStorage.setItem('username', params.username);
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(['admin']),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            fullName: 'Jane Doe',
            avatar:
                'https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640'
        })
};

describe("Admin Container", () => {
    it("should render without resource", async () => {
        render(
            <Admin
                authProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
            />
        );
        expect(ReadyPage).toBeTruthy();
    });
});
