import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { AccessControlProvider } from "@refinedev/core";

import { render, TestWrapper, waitFor } from "@test";
import { Edit } from "./";
import { crudEditTests } from "@refinedev/ui-tests";
import { RefineButtonTestIds } from "@refinedev/ui-types";
import {
    DeleteButton,
    ListButton,
    RefreshButton,
    SaveButton,
} from "@components/buttons";

const renderEdit = (
    edit: ReactNode,
    accessControlProvider?: AccessControlProvider,
) => {
    return render(
        <Routes>
            <Route path="/:resource/edit/:id" element={edit} />
        </Routes>,
        {
            wrapper: TestWrapper({
                routerInitialEntries: ["/posts/edit/1"],
                accessControlProvider,
            }),
        },
    );
};

describe("Edit", () => {
    crudEditTests.bind(this)(Edit as any);

    it("should render optional mutationMode with mutationModeProp prop", async () => {
        const container = renderEdit(<Edit mutationMode="undoable" />);

        expect(container).toBeTruthy();
    });

    describe("render delete button", () => {
        it("should render delete button ", async () => {
            const { getByText, queryByTestId } = render(
                <Routes>
                    <Route path="/:resource/edit/:id" element={<Edit />} />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();

            getByText("Edit Post");
        });

        it("should not render delete button on resource canDelete false", async () => {
            const { getByText, queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/edit/:id"
                        element={<Edit />}
                    ></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();

            getByText("Edit Post");
        });

        it("should not render delete button on resource canDelete true & canDelete props false on component", async () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/edit/:id"
                        element={<Edit canDelete={false} />}
                    ></Route>
                </Routes>,

                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();
        });

        it("should render delete button on resource canDelete false & canDelete props true on component", async () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/edit/:id"
                        element={<Edit canDelete={true} />}
                    ></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();
        });

        it("should render delete button on resource canDelete false & deleteButtonProps props not null on component", async () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/edit/:id"
                        element={<Edit deleteButtonProps={{ size: "large" }} />}
                    ></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();
        });
    });

    describe("accessibility of buttons by accessControlProvider", () => {
        it("should render disabled list button and not disabled delete button", async () => {
            const { queryByTestId } = renderEdit(<Edit canDelete />, {
                can: ({ action }) => {
                    switch (action) {
                        case "list":
                            return Promise.resolve({ can: true });
                        case "delete":
                        default:
                            return Promise.resolve({ can: false });
                    }
                },
            });

            await waitFor(() =>
                expect(
                    queryByTestId(RefineButtonTestIds.ListButton),
                ).not.toBeDisabled(),
            );
            await waitFor(() =>
                expect(
                    queryByTestId(RefineButtonTestIds.DeleteButton),
                ).toBeDisabled(),
            );
        });

        it("should render disabled list button and delete button", async () => {
            const { queryByTestId } = renderEdit(<Edit canDelete />, {
                can: ({ action }) => {
                    switch (action) {
                        case "list":
                        case "delete":
                            return Promise.resolve({ can: false });
                        default:
                            return Promise.resolve({ can: false });
                    }
                },
            });

            await waitFor(() =>
                expect(
                    queryByTestId(RefineButtonTestIds.ListButton),
                ).toBeDisabled(),
            );
            await waitFor(() =>
                expect(
                    queryByTestId(RefineButtonTestIds.DeleteButton),
                ).toBeDisabled(),
            );
        });

        it("should customize default buttons with default props", async () => {
            const { queryByTestId } = renderEdit(
                <Edit
                    canDelete
                    saveButtonProps={{ className: "customize-test" }}
                    headerButtons={({
                        listButtonProps,
                        refreshButtonProps,
                    }) => {
                        return (
                            <>
                                <RefreshButton {...refreshButtonProps} />
                                <ListButton {...listButtonProps} />
                            </>
                        );
                    }}
                    footerButtons={({ deleteButtonProps, saveButtonProps }) => {
                        return (
                            <>
                                <DeleteButton {...deleteButtonProps} />
                                <SaveButton {...saveButtonProps} />
                            </>
                        );
                    }}
                />,
                {
                    can: ({ action }) => {
                        switch (action) {
                            case "list":
                            case "delete":
                                return Promise.resolve({ can: false });
                            default:
                                return Promise.resolve({ can: false });
                        }
                    },
                },
            );

            await waitFor(() =>
                expect(
                    queryByTestId(RefineButtonTestIds.DeleteButton),
                ).toBeDisabled(),
            );
            await waitFor(() =>
                expect(
                    queryByTestId(RefineButtonTestIds.ListButton),
                ).toBeDisabled(),
            );
            expect(queryByTestId(RefineButtonTestIds.SaveButton)).toHaveClass(
                "customize-test",
            );
            expect(
                queryByTestId(RefineButtonTestIds.RefreshButton),
            ).toBeTruthy();
        });
    });
});
