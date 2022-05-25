import React from "react";
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

const defaultProps = {
    opened: true,
    setOpened: jest.fn(),
    collapsed: true,
    setCollapsed: jest.fn(),
    drawerWidth: 256,
};

describe("Sider", () => {
    it("should render successful", async () => {
        const { getAllByText } = render(<Sider {...defaultProps} />, {
            wrapper: TestWrapper({}),
        });

        await waitFor(() => getAllByText("Posts"));
        expect(getAllByText("Posts")).toHaveLength(2);
    });

    it("should render logout menu item successful", async () => {
        const { getAllByText } = render(<Sider {...defaultProps} />, {
            wrapper: TestWrapper({
                authProvider: mockAuthProvider,
            }),
        });

        await waitFor(() => getAllByText("Posts"));
        expect(getAllByText("Logout")).toHaveLength(2);
    });

    it("should work menu item click", async () => {
        const { getAllByText } = render(<Sider {...defaultProps} />, {
            wrapper: TestWrapper({
                authProvider: mockAuthProvider,
            }),
        });

        await waitFor(() => fireEvent.click(getAllByText("Posts")[0]));
        expect(window.location.pathname).toBe("/posts");
    });

    it("should work logout menu item click", async () => {
        const logoutMockedAuthProvider = {
            ...mockAuthProvider,
            logout: jest.fn().mockImplementation(() => Promise.resolve()),
        };
        const { getAllByText } = render(<Sider {...defaultProps} />, {
            wrapper: TestWrapper({
                authProvider: logoutMockedAuthProvider,
            }),
        });

        await act(async () => {
            fireEvent.click(getAllByText("Logout")[0]);
        });

        expect(logoutMockedAuthProvider.logout).toBeCalledTimes(1);
    });

    xit("should work sider collapse ", async () => {
        const { container } = render(<Sider {...defaultProps} />, {
            wrapper: TestWrapper({}),
        });
        await act(async () => {
            fireEvent.click(
                container.children.item(0)!.children.item(1)!
                    .firstElementChild!,
            );
        });
    });

    it("should render only allowed menu items", async () => {
        const { getAllByText, queryByText } = render(
            <Sider {...defaultProps} />,
            {
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
            },
        );

        await waitFor(() => getAllByText("Posts"));
        await waitFor(() => expect(queryByText("Users")).toBeNull());
    });
});
