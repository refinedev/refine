import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { AccessControlProvider } from "@pankod/refine-core";
import { crudShowTests } from "@pankod/refine-ui-tests";

import { act, render, TestWrapper, waitFor } from "@test";

import { Show } from "./index";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";

const renderShow = (
    show: ReactNode,
    accessControlProvider?: AccessControlProvider,
) => {
    return render(
        <Routes>
            <Route path="/:resource/:action/:id" element={show} />
        </Routes>,
        {
            wrapper: TestWrapper({
                routerInitialEntries: ["/posts/show/1"],
                accessControlProvider,
            }),
        },
    );
};

describe("Show", () => {
    crudShowTests.bind(this)(Show);

    it("depending on the accessControlProvider it should get the buttons successfully", async () => {
        jest.useRealTimers();

        const { getByText, getAllByText, queryByTestId } = renderShow(
            <Show canEdit canDelete />,
            {
                can: ({ action }) => {
                    switch (action) {
                        case "edit":
                        case "list":
                            return Promise.resolve({ can: true });
                        case "delete":
                        default:
                            return Promise.resolve({ can: false });
                    }
                },
            },
        );

        await waitFor(() =>
            expect(getByText("Edit").closest("button")).not.toBeDisabled(),
        );
        await waitFor(() =>
            expect(
                getAllByText("Posts")[1].closest("button"),
            ).not.toBeDisabled(),
        );

        await waitFor(() =>
            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).toBeDisabled(),
        );
    });

    it("should render optional recordItemId with resource prop, not render list button", async () => {
        jest.useFakeTimers();

        const { getByText, queryByTestId } = renderShow(
            <Show recordItemId="1" />,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Show Post");

        expect(queryByTestId(RefineButtonTestIds.ListButton)).toBeNull();
    });

    describe("render edit button", () => {
        it("should render edit button", async () => {
            jest.useFakeTimers();

            const { getByText, queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show />}
                    ></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", edit: () => null }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.EditButton),
            ).not.toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit false", async () => {
            jest.useFakeTimers();

            const { getByText, queryByTestId } = render(
                <Routes>
                    <Route path="/:resource/:action/:id" element={<Show />} />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.EditButton)).toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit true & canEdit props false on component", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show canEdit={false} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", edit: () => null }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.EditButton)).toBeNull();
        });

        it("should render edit button on resource canEdit false & canEdit props true on component", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show canEdit={true} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.EditButton),
            ).not.toBeNull();
        });

        it("should render edit button with recordItemId prop", async () => {
            jest.useFakeTimers();

            const { getByText, queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show recordItemId="1" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", edit: () => null }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.EditButton),
            ).not.toBeNull();

            getByText("Show Post");
        });
    });

    describe("render delete button", () => {
        it("should render delete button", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = render(
                <Routes>
                    <Route path="/:resource/:action/:id" element={<Show />} />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/show/1"],
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

        it("should not render delete button on resource canDelete false", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = render(
                <Routes>
                    <Route path="/:resource/:action/:id" element={<Show />} />
                </Routes>,

                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.DeleteButton)).toBeNull();
        });

        it("should not render delete button on resource canDelete true & canDelete props false on component", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show canDelete={false} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/show/1"],
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
                        path="/:resource/:action/:id"
                        element={<Show canDelete={true} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/show/1"],
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

        it("should render delete button with recordItemId prop", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show recordItemId="1" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/show/1"],
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

        describe("Breadcrumb", () => {
            it("should render breadcrumb", async () => {
                jest.useFakeTimers();

                const { getAllByLabelText } = render(
                    <Routes>
                        <Route
                            path="/:resource/:action/:id"
                            element={<Show recordItemId="1" />}
                        />
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            resources: [{ name: "posts" }],
                            routerInitialEntries: ["/posts/show/1"],
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
                            element={
                                <Show recordItemId="1" breadcrumb={null} />
                            }
                        />
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            resources: [{ name: "posts" }],
                            routerInitialEntries: ["/posts/show/1"],
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
});
