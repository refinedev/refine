import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { AccessControlProvider } from "@pankod/refine-core";

import { act, render, TestWrapper, waitFor } from "@test";
import { Edit } from "./";
import { crudEditTests } from "@pankod/refine-ui-tests";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";

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
    crudEditTests.bind(this)(Edit);

    it("should render optional mutationMode with mutationModeProp prop", async () => {
        jest.useFakeTimers();

        const container = renderEdit(<Edit mutationMode="undoable" />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
    });

    it("should render optional resource with resource prop", async () => {
        jest.useFakeTimers();

        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={<Edit resource="posts" />}
                ></Route>
            </Routes>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/custom"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Edit Post");
    });

    describe("render delete button", () => {
        it("should render delete button ", async () => {
            jest.useFakeTimers();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();

            getByText("Edit Post");
        });

        it("should not render delete button on resource canDelete false", async () => {
            jest.useFakeTimers();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();

            getByText("Edit Post");
        });

        it("should not render delete button on resource canDelete true & canDelete props false on component", async () => {
            jest.useFakeTimers();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();
        });

        it("should render delete button on resource canDelete false & canDelete props true on component", async () => {
            jest.useFakeTimers();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();
        });

        it("should render delete button on resource canDelete false & deleteButtonProps props not null on component", async () => {
            jest.useFakeTimers();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();
        });
    });

    describe("accessibility of buttons by accessControlProvider", () => {
        it("should render disabled list button and not disabled delete button", async () => {
            jest.useRealTimers();

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
            jest.useRealTimers();

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
    });

    describe("Breadcrumb ", () => {
        it("should render breadcrumb", async () => {
            jest.useFakeTimers();

            const { getAllByLabelText } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Edit recordItemId="1" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(getAllByLabelText("breadcrumb")).not.toBeNull();
        });
        it("should not render breadcrumb", async () => {
            jest.useFakeTimers();

            const { queryByLabelText } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Edit recordItemId="1" breadcrumb={null} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByLabelText("breadcrumb")).not.toBeInTheDocument();
        });
    });
});
