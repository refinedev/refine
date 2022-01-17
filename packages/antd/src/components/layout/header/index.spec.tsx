import React from "react";
import { waitFor } from "@testing-library/react";
import { render, TestWrapper } from "@test";

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
    it("should render successfull user name and avatar in header", async () => {
        const { getByText, container } = render(<Header />, {
            wrapper: TestWrapper({
                authProvider: mockAuthProvider,
            }),
        });

        await waitFor(() => getByText("username"));
        expect(container.getElementsByTagName("img")[0].src).toBe(
            "localhost:3000",
        );
    });
});
