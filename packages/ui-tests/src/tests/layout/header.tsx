import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";

import { act, render, TestWrapper } from "@test";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({ name: "username", avatar: "localhost:3000" }),
};

export const layoutHeaderTests = function (
    HeaderElement: React.ComponentType<RefineLayoutHeaderProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Header Element", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("should render successfull user name and avatar in header", async () => {
            const { findByText, getByRole } = render(<HeaderElement />, {
                wrapper: TestWrapper({
                    authProvider: mockAuthProvider,
                }),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            await findByText("username");
            expect(getByRole("img")).toHaveAttribute("src", "localhost:3000");
        });
    });
};
