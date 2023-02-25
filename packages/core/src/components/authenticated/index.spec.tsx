import React from "react";
import { act, waitFor } from "@testing-library/react";

import {
    MockJSONServer,
    mockLegacyRouterProvider,
    render,
    TestWrapper,
} from "@test";
import { Authenticated } from "./";
import { AuthBindings } from "src/interfaces";

const legacyMockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () => Promise.resolve(),
};

const mockReplace = jest.fn();

const mockLegacyRouter = {
    ...mockLegacyRouterProvider(),
    useHistory: () => ({
        replace: mockReplace,
    }),
    useLocation: () => ({
        pathname: "/posts",
        search: "",
    }),
};

const mockAuthProvider: AuthBindings = {
    login: () =>
        Promise.resolve({
            success: true,
        }),
    logout: () => Promise.resolve({ success: true }),
    onError: () => Promise.resolve({}),
    check: () => Promise.resolve({ authenticated: true }),
    getPermissions: () => Promise.resolve(),
};

describe("v3LegacyAuthProviderCompatible Authenticated", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (typeof message !== "undefined") console.warn(message);
        });
    });

    it("should render children successfully", async () => {
        const { getByText } = render(
            <Authenticated v3LegacyAuthProviderCompatible={true}>
                Custom Authenticated
            </Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    legacyAuthProvider: legacyMockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await waitFor(() => getByText("Custom Authenticated"));
    });

    it("not authenticated test", async () => {
        legacyMockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.reject());

        const { queryByText } = render(
            <Authenticated v3LegacyAuthProviderCompatible={true}>
                Custom Authenticated
            </Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    legacyAuthProvider: legacyMockAuthProvider,
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
        legacyMockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.reject());

        const { queryByText } = render(
            <Authenticated
                fallback={<div>Error fallback</div>}
                v3LegacyAuthProviderCompatible={true}
            >
                Custom Authenticated
            </Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    legacyAuthProvider: legacyMockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await act(async () => {
            expect(queryByText("Error fallback"));
        });
    });

    it("loading test", async () => {
        legacyMockAuthProvider.checkAuth = jest
            .fn()
            .mockImplementation(() => Promise.reject());

        const { queryByText } = render(
            <Authenticated
                loading={<div>loading</div>}
                v3LegacyAuthProviderCompatible={true}
            >
                Custom Authenticated
            </Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    legacyAuthProvider: legacyMockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await act(async () => {
            expect(queryByText("loading"));
        });
    });
});

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
        mockAuthProvider.check = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve({ authenticated: false }),
            );

        const { queryByText } = render(
            <Authenticated>Custom Authenticated</Authenticated>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [{ name: "posts", route: "posts" }],
                    legacyRouterProvider: mockLegacyRouter,
                }),
            },
        );

        await waitFor(() => {
            expect(queryByText("Custom Authenticated")).toBeNull();
            expect(mockReplace).toBeCalledTimes(1);
        });
    });

    it("not authenticated fallback component test", async () => {
        mockAuthProvider.check = jest.fn().mockImplementation(() =>
            Promise.resolve({
                authenticated: false,
                error: new Error("Not authenticated"),
            }),
        );

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
