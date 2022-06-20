import React from "react";
import { render, TestWrapper, act } from "@test";

import { Header } from "./index";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({ name: "username", avatar: "localhost:3000" }),
};

describe("Header", () => {
    beforeAll(() => {
        // jest.spyOn(console, "warn").mockImplementation(jest.fn());
        jest.useFakeTimers();
    });

    it("should render successfull user name and avatar in header", async () => {
        const { findByText, container } = render(<Header />, {
            wrapper: TestWrapper({
                authProvider: mockAuthProvider,
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await findByText("username");
        expect(container.getElementsByTagName("img")[0].src).toBe(
            "localhost:3000",
        );
    });
});
