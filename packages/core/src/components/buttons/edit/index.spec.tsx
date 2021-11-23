import React from "react";

import { fireEvent, render, TestWrapper, wait } from "@test";
import { EditButton } from "./";

describe("Edit Button", () => {
    const edit = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <EditButton onClick={() => edit()} />,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("Edit");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <EditButton>refine</EditButton>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<EditButton hideText />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Edit")).not.toBeInTheDocument();
    });

    it("should be disabled when user not have access", async () => {
        const { container, getByText } = render(<EditButton>Edit</EditButton>, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                accessControlProvider: {
                    can: () => Promise.resolve({ can: false }),
                },
            }),
        });

        expect(container).toBeTruthy();

        await wait(() =>
            expect(getByText("Edit").closest("button")).toBeDisabled(),
        );
    });

    it("should be disabled when recordId not allowed", async () => {
        const { container, getByText } = render(
            <EditButton recordItemId="1">Edit</EditButton>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    accessControlProvider: {
                        can: ({ params }) => {
                            if (params.id === "1") {
                                return Promise.resolve({ can: false });
                            }
                            return Promise.resolve({ can: true });
                        },
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        await wait(() =>
            expect(getByText("Edit").closest("button")).toBeDisabled(),
        );
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
            <EditButton ignoreAccessControlProvider>Edit</EditButton>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        await wait(() =>
            expect(getByText("Edit").closest("button")).not.toBeDisabled(),
        );
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(<EditButton onClick={() => edit()} />, {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        fireEvent.click(getByText("Edit"));

        expect(edit).toHaveBeenCalledTimes(1);
    });
});
