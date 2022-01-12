import React from "react";
import ReactRouterDom from "react-router-dom";
import { waitFor } from "@testing-library/react";
import { render, fireEvent, TestWrapper, act } from "@test";

import { Sider } from "./index";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () => Promise.resolve(),
    isProvided: true,
};

const mHistory = {
    push: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("Sider", () => {
    it("should render successful", async () => {
        const { getByText } = render(<Sider />, {
            wrapper: TestWrapper({}),
        });

        await waitFor(() => getByText("Posts"));
    });

    it("should render logout menu item successful", async () => {
        const { getByText } = render(<Sider />, {
            wrapper: TestWrapper({
                authProvider: mockAuthProvider,
            }),
        });

        await waitFor(() => getByText("Posts"));
        getByText("Logout");
    });

    it("should work menu item click", async () => {
        const { getByText } = render(<Sider />, {
            wrapper: TestWrapper({
                authProvider: mockAuthProvider,
            }),
        });

        await waitFor(() => fireEvent.click(getByText("Posts")));
        expect(mHistory.push).toBeCalledWith("/posts", undefined);
    });

    it("should work logout menu item click", async () => {
        const logoutMockedAuthProvider = {
            ...mockAuthProvider,
            logout: jest.fn().mockImplementation(() => Promise.resolve()),
        };
        const { getByText } = render(<Sider />, {
            wrapper: TestWrapper({
                authProvider: logoutMockedAuthProvider,
            }),
        });

        await act(async () => {
            fireEvent.click(getByText("Logout"));
        });

        expect(logoutMockedAuthProvider.logout).toBeCalledTimes(1);
    });

    it("should work sider collapse ", async () => {
        const { container } = render(<Sider />, {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            fireEvent.click(
                container.children.item(0).children.item(1).firstElementChild,
            );
        });
    });

    it("should render only allowed menu items", async () => {
        const { getByText, queryByText } = render(<Sider />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }, { name: "users" }],
                accessControlProvider: {
                    can: ({ action, resource }) => {
                        if (action === "list" && resource === "posts") {
                            return Promise.resolve({ can: true });
                        }
                        if (action === "list" && resource === "users") {
                            return Promise.resolve({ can: false });
                        }
                        return Promise.resolve({ can: false });
                    },
                },
            }),
        });

        await waitFor(() => getByText("Posts"));
        await waitFor(() => expect(queryByText("Users")).toBeNull());
    });
});
