import React from "react";
import ReactRouterDom, { Route } from "react-router-dom";
import { fireEvent, render, TestWrapper, waitFor } from "@test";
import { EditButton } from "./";

const mHistory = {
    push: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("Edit Button", () => {
    const edit = jest.fn();

    it("should render button successfuly", () => {
        const { container, getByText } = render(
            <EditButton onClick={() => edit()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("Edit");
    });

    it("should render text by children", () => {
        const { container, getByText } = render(
            <EditButton>refine</EditButton>,
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(container).toBeTruthy();

        getByText("refine");
    });

    it("should render without text show only icon", () => {
        const { container, queryByText } = render(<EditButton hideText />, {
            wrapper: TestWrapper({}),
        });

        expect(container).toBeTruthy();

        expect(queryByText("Edit")).not.toBeInTheDocument();
    });

    it("should be disabled when user not have access", async () => {
        const { container, getByText } = render(<EditButton>Edit</EditButton>, {
            wrapper: TestWrapper({
                accessControlProvider: {
                    can: () => Promise.resolve({ can: false }),
                },
            }),
        });

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Edit").closest("button")).toBeDisabled(),
        );
    });

    it("should be disabled when recordId not allowed", async () => {
        const { container, getByText } = render(
            <EditButton recordItemId="1">Edit</EditButton>,
            {
                wrapper: TestWrapper({
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

        await waitFor(() =>
            expect(getByText("Edit").closest("button")).toBeDisabled(),
        );
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
            <EditButton ignoreAccessControlProvider>Edit</EditButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: () => Promise.resolve({ can: false }),
                    },
                }),
            },
        );

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Edit").closest("button")).not.toBeDisabled(),
        );
    });

    it("should successfully return disabled button custom title", async () => {
        const { container, getByText } = render(<EditButton>Edit</EditButton>, {
            wrapper: TestWrapper({
                accessControlProvider: {
                    can: () =>
                        Promise.resolve({
                            can: false,
                            reason: "Access Denied",
                        }),
                },
            }),
        });

        expect(container).toBeTruthy();

        await waitFor(() =>
            expect(getByText("Edit").closest("button")).not.toBeDisabled(),
        );
        await waitFor(() =>
            expect(
                getByText("Edit").closest("button")?.getAttribute("title"),
            ).toBe("Access Denied"),
        );
    });

    it("should render called function successfully if click the button", () => {
        const { getByText } = render(<EditButton onClick={() => edit()} />, {
            wrapper: TestWrapper({}),
        });

        fireEvent.click(getByText("Edit"));

        expect(edit).toHaveBeenCalledTimes(1);
    });

    it("should custom resource and recordItemId redirect show route called function successfully if click the button", () => {
        const { getByText } = render(
            <Route path="/:resource">
                <EditButton resourceName="categories" recordItemId="1" />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }, { name: "categories" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );
        fireEvent.click(getByText("Edit"));

        expect(mHistory.push).toBeCalledWith("/categories/edit/1");
    });
});
