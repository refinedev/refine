import React from "react";
import { render, TestWrapper } from "@test";

import { CanAccess } from ".";
import { act } from "react-dom/test-utils";

describe("CanAccess Component", () => {
    it("should render children", async () => {
        const { container, findByText } = render(
            <CanAccess action="access" resource="posts">
                Accessible
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: ({ resource, action }) => {
                            if (action === "access" && resource === "posts") {
                                return Promise.resolve({ can: true });
                            }
                            return Promise.resolve({ can: false });
                        },
                    },
                }),
            },
        );

        expect(container).toBeTruthy();
        await findByText("Accessible");
    });

    it("should not render children", async () => {
        const { container, queryByText } = render(
            <CanAccess action="access" resource="posts">
                Accessible
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        await act(async () => {
            expect(container).toBeTruthy();
            expect(queryByText("Accessible")).not.toBeInTheDocument();
        });
    });

    it("should successfully pass the own attirbute to its children", async () => {
        const { container, findByText } = render(
            <CanAccess action="access" resource="posts" data-id="refine">
                <p>Accessible</p>
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: true }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        const el = await findByText("Accessible");

        expect(el.closest("p")?.getAttribute("data-id"));
    });

    it("should fallback successfully render when not accessible", async () => {
        const { container, queryByText, findByText } = render(
            <CanAccess
                action="access"
                resource="posts"
                fallback={<p>Access Denied</p>}
            >
                <p>Accessible</p>
            </CanAccess>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        expect(queryByText("Accessible")).not.toBeInTheDocument();
        await findByText("Access Denied");
    });
});
