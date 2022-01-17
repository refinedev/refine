import React from "react";
import { render, fireEvent, TestWrapper, act } from "@test";
import ReactRouterDom from "react-router-dom";

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

    it("should call checkAuth on route change", () => {
        const checkAuthMockedAuthProvider = {
            ...mockAuthProvider,
            checkAuth: jest.fn().mockImplementation(() => Promise.resolve()),
        };

        render(<RouteChangeHandler />, {
            wrapper: TestWrapper({
                authProvider: checkAuthMockedAuthProvider,
            }),
        });

        expect(checkAuthMockedAuthProvider.checkAuth).toBeCalledTimes(1);
    });

    it("should ignore checkAuth Promise.reject", () => {
        const checkAuthMockedAuthProvider = {
            ...mockAuthProvider,
            checkAuth: jest.fn().mockImplementation(() => Promise.reject()),
        };

        render(<RouteChangeHandler />, {
            wrapper: TestWrapper({
                authProvider: checkAuthMockedAuthProvider,
            }),
        });

        expect(checkAuthMockedAuthProvider.checkAuth).toBeCalledTimes(1);
    });
});
