import React from "react";

import {
    render,
    TestWrapper,
    MockJSONServer,
    act,
    wait,
    waitForElement,
    getByText,
    waitForDomChange,
} from "@test";

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
    // it("renders renderUnauthorized", async () => {
    //     mockAuthProvider.checkAuth = jest
    //         .fn()
    //         .mockImplementation(() => Promise.reject("test"));

    //     const renderRouteProvider = () => {
    //         return render(
    //             <RouteProvider
    //                 resources={[{ name: "posts" }]}
    //                 customRoutes={[]}
    //             />,
    //             {
    //                 wrapper: TestWrapper({
    //                     dataProvider: MockJSONServer,
    //                     authProvider: mockAuthProvider,
    //                     resources: [{ name: "posts" }],
    //                 }),
    //             },
    //         );
    //     };
    //     await act(async () => {
    //         renderRouteProvider();
    //     });

    //     const { getAllByText } = renderRouteProvider();

    //     getAllByText("Login");
    //     getAllByText("Username");
    //     getAllByText("Password");
    // });

    it("renders with create", async () => {
        mockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.resolve());

        // await wait(() =>
        //     expect(mockAuthProvider.checkAuth).toHaveBeenCalledTimes(1),
        // );
        const CreateComponent = () => {
            return <div>create</div>;
        };

        const renderRouteProvider = () => {
            return render(
                <RouteProvider
                    resources={[{ name: "posts", create: CreateComponent }]}
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

        // await waitForDomChange();
        await act(async () => {
            const { debug, getByText } = renderRouteProvider();
            // getByText("create");
            debug();
        });
    });
});
