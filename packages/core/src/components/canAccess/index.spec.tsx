import React from "react";
import { render, TestWrapper, wait } from "@test";

import { CanAccess } from ".";

describe("CanAccess Component", () => {
    it("should render children", async () => {
        const { container, getByText } = render(
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
        await wait(() => getByText("Accessible"));
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

        expect(container).toBeTruthy();
        await wait(() =>
            expect(queryByText("Accessible")).not.toBeInTheDocument(),
        );
    });

    it("should successfully pass the own attirbute to its children", async () => {
        const { container, getByText } = render(
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

        await wait(() =>
            expect(
                getByText("Accessible").closest("p")?.getAttribute("data-id"),
            ).toBe("refine"),
        );
    });
});
