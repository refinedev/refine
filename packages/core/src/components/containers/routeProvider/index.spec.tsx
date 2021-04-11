import React from "react";

import { render, TestWrapper, MockJSONServer, act } from "@test";

import { RouteProvider } from "./index";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            fullName: "Jane Doe",
            avatar:
                "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
};

describe("RouteProvider", () => {
    it("renders renderUnauthorized", async () => {
        mockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.reject("test"));

        const renderRouteProvider = () => {
            return render(
                <RouteProvider
                    resources={[{ name: "posts" }]}
                    customRoutes={[]}
                />,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        authProvider: mockAuthProvider,
                        resources: [{ name: "posts" }],
                    }),
                },
            );
        };
        await act(async () => {
            renderRouteProvider();
        });

        const { getAllByText, debug } = renderRouteProvider();

        getAllByText("Login");
        getAllByText("Username");
        getAllByText("Password");
    });
});
