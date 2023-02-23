import React from "react";
import { render, TestWrapper, act } from "@test";

import { RouteChangeHandler } from "./index";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () => Promise.resolve(),
    isProvided: true,
};

describe("routeChangeHandler", () => {
    it("should render successful", () => {
        const { container } = render(<RouteChangeHandler />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container.innerHTML).toHaveLength(0);
    });

    it("should call checkAuth on route change", async () => {
        const checkAuthMockedAuthProvider = {
            ...mockAuthProvider,
            checkAuth: jest.fn().mockImplementation(() => Promise.resolve()),
        };

        await act(async () => {
            render(<RouteChangeHandler />, {
                wrapper: TestWrapper({
                    legacyAuthProvider: checkAuthMockedAuthProvider,
                }),
            });
        });

        expect(checkAuthMockedAuthProvider.checkAuth).toBeCalledTimes(1);
    });

    it("should ignore checkAuth Promise.reject", async () => {
        const checkAuthMockedAuthProvider = {
            ...mockAuthProvider,
            checkAuth: jest.fn().mockImplementation(() => Promise.reject()),
        };

        await act(async () => {
            render(<RouteChangeHandler />, {
                wrapper: TestWrapper({
                    legacyAuthProvider: checkAuthMockedAuthProvider,
                }),
            });
        });

        expect(checkAuthMockedAuthProvider.checkAuth).toBeCalledTimes(1);
    });
});
