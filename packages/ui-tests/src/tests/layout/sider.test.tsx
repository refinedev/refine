import React from "react";
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";

import { act, fireEvent, render, TestWrapper, waitFor } from "@test";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () => Promise.resolve(),
    isProvided: true,
};

export const layoutSiderTests = function (
    SiderElement: React.ComponentType<RefineLayoutSiderProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Sider Element", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("should render successful", async () => {
            const { container } = render(<SiderElement />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should render logout menu item successful", async () => {
            const { getByText } = render(<SiderElement />, {
                wrapper: TestWrapper({
                    authProvider: mockAuthProvider,
                }),
            });

            await waitFor(() => getByText("Posts"));
            getByText("Logout");
        });

        it("should work menu item click", async () => {
            const { getByText } = render(<SiderElement />, {
                wrapper: TestWrapper({
                    authProvider: mockAuthProvider,
                }),
            });

            await waitFor(() => fireEvent.click(getByText("Posts")));
            expect(window.location.pathname).toBe("/posts");
        });

        it("should work logout menu item click", async () => {
            const logoutMockedAuthProvider = {
                ...mockAuthProvider,
                logout: jest.fn().mockImplementation(() => Promise.resolve()),
            };
            const { getByText } = render(<SiderElement />, {
                wrapper: TestWrapper({
                    authProvider: logoutMockedAuthProvider,
                }),
            });

            await act(async () => {
                fireEvent.click(getByText("Logout"));
            });

            expect(logoutMockedAuthProvider.logout).toBeCalledTimes(1);
        });

        it("should render only allowed menu items", async () => {
            const { getByText, queryByText } = render(<SiderElement />, {
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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            await waitFor(() => getByText("Posts"));
            await waitFor(() => expect(queryByText("Users")).toBeNull());
        });
    });
};
