import React from "react";
import { wait } from "@testing-library/react"; // highlight-line

import { act, MockJSONServer, render, TestWrapper } from "@test";
import { Authenticated } from "./";

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

describe("Authenticated", () => {
    it("should render children successfully", async () => {
        const { getByText } = render(
            <Authenticated>Custom Authenticated</Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await wait(() => getByText("Custom Authenticated"));
    });

    it("not authenticated test", async () => {
        mockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.reject());

        const { queryByText } = render(
            <Authenticated>Custom Authenticated</Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await wait(() => {
            expect(queryByText("Custom Authenticated")).toBeNull();
        });
    });
});
