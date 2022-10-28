import React from "react";
import { render, TestWrapper } from "@test";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({ name: "John Doe", avatar: "localhost:3000" }),
};

import { Header } from "./index";

describe("Header", () => {
    it("should render successfull user name and avatar fallback in header", async () => {
        const { findByText, getByText } = render(<Header />, {
            wrapper: TestWrapper({
                authProvider: mockAuthProvider,
            }),
        });

        await findByText("John Doe");
        getByText("JD");
    });
});
