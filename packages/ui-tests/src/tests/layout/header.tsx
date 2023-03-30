import React from "react";
import { RefineLayoutHeaderProps } from "@refinedev/ui-types";

import { render, TestWrapper } from "@test";
import { AuthBindings } from "@refinedev/core";

const mockLegacyAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({ name: "username", avatar: "localhost:3000" }),
};

const mockAuthProvider: AuthBindings = {
    check: () => Promise.resolve({ authenticated: true }),
    login: () => Promise.resolve({ success: true }),
    logout: () => Promise.resolve({ success: true }),
    onError: () => Promise.resolve({}),
    getPermissions: () => Promise.resolve(["admin"]),
    getIdentity: () =>
        Promise.resolve({ name: "username", avatar: "localhost:3000" }),
};

export const layoutHeaderTests = function (
    HeaderElement: React.ComponentType<RefineLayoutHeaderProps>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Header Element", () => {
        // NOTE : Will be removed in v5
        it("should render successfull user name and avatar in header with legacy authProvider", async () => {
            const { findByText, getByRole } = render(<HeaderElement />, {
                wrapper: TestWrapper({
                    legacyAuthProvider: mockLegacyAuthProvider,
                }),
            });

            await findByText("username");
            expect(getByRole("img")).toHaveAttribute("src", "localhost:3000");
        });

        it("should render successfull user name and avatar in header with authProvider", async () => {
            const { findByText, getByRole } = render(<HeaderElement />, {
                wrapper: TestWrapper({
                    authProvider: mockAuthProvider,
                }),
            });

            await findByText("username");
            expect(getByRole("img")).toHaveAttribute("src", "localhost:3000");
        });
    });
};
