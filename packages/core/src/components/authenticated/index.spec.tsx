import React from "react";
import { act, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { MockJSONServer, render, TestWrapper } from "@test";
import { Authenticated } from "./";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () => Promise.resolve(),
};

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

describe("Authenticated", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (typeof message !== "undefined") console.warn(message);
        });
    });

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

        await waitFor(() => getByText("Custom Authenticated"));
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

        await waitFor(() => {
            expect(queryByText("Custom Authenticated")).toBeNull();
            expect(mHistory).toBeCalledTimes(1);
        });
    });

    it("not authenticated fallback component test", async () => {
        mockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.reject());

        const { queryByText } = render(
            <Authenticated fallback={<div>Error fallback</div>}>
                Custom Authenticated
            </Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await act(async () => {
            expect(queryByText("Error fallback"));
        });
    });

    it("loading test", async () => {
        mockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.reject());

        const { queryByText } = render(
            <Authenticated loading={<div>loading</div>}>
                Custom Authenticated
            </Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await act(async () => {
            expect(queryByText("loading"));
        });
    });
});
