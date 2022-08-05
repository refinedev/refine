import React from "react";
import { AccessControlProvider } from "@pankod/refine-core";
import { Route, Routes } from "react-router-dom";
import {
    RefineCrudListProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

import { act, ITestWrapperProps, render, TestWrapper, waitFor } from "@test";

const renderList = (
    list: React.ReactNode,
    accessControlProvider?: AccessControlProvider,
    wrapperProps?: ITestWrapperProps,
) => {
    return render(
        <Routes>
            <Route path="/:resource" element={list} />
        </Routes>,
        {
            wrapper: TestWrapper(
                wrapperProps
                    ? wrapperProps
                    : {
                          routerInitialEntries: ["/posts"],
                          accessControlProvider,
                      },
            ),
        },
    );
};

export const crudListTests = function (
    List: React.ComponentType<RefineCrudListProps<any, any, any, any, any, {}>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / CRUD List", () => {
        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
            jest.useFakeTimers();
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it("should render children", async () => {
            jest.useFakeTimers();

            const { getByText } = renderList(
                <List key="posts">
                    <div>No Data</div>
                </List>,
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("No Data");
        });

        it("should render optional title with title prop", async () => {
            jest.useFakeTimers();

            const { getByText } = renderList(
                <List
                    headerProps={{
                        title: "New Title",
                    }}
                ></List>,
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("New Title");
        });

        it("should render with label instead of resource name successfully", async () => {
            jest.useFakeTimers();

            const { getByText } = renderList(<List />, undefined, {
                resources: [
                    {
                        name: "posts",
                        options: { route: "posts", label: "test" },
                    },
                ],
                routerInitialEntries: ["/posts"],
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("Tests");
        });

        it("should render create button", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = renderList(<List />, undefined, {
                resources: [
                    {
                        name: "posts",
                        create: () => null,
                    },
                ],
                routerInitialEntries: ["/posts"],
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.CreateButton),
            ).not.toBeNull();
        });

        it("should not render create button on resource#canCreate=false", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = renderList(<List />, undefined, {
                resources: [
                    {
                        name: "posts",
                        canCreate: false,
                    },
                ],
                routerInitialEntries: ["/posts"],
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeNull();
        });

        it("should render create button on resource#canCreate=false & props#createButtonProps!=null", async () => {
            jest.useFakeTimers();

            const { getByText, queryByTestId } = renderList(
                <List createButtonProps={{ size: "large" }} />,
                undefined,
                { routerInitialEntries: ["/posts"] },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.CreateButton),
            ).not.toBeNull();

            getByText("Posts");
        });

        it("should not render create button on resource#canCreate=true & props#canCreate=false", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = renderList(
                <List canCreate={false} />,
                undefined,
                {
                    resources: [
                        {
                            name: "posts",
                            create: () => null,
                        },
                    ],
                    routerInitialEntries: ["/posts"],
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeNull();
        });

        it("should render create button on resource#canCreate=false & props#canCreate=true", async () => {
            jest.useFakeTimers();

            const { queryByTestId } = renderList(
                <List canCreate={true} />,
                undefined,
                {
                    resources: [
                        {
                            name: "posts",
                        },
                    ],
                    routerInitialEntries: ["/posts"],
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.CreateButton),
            ).not.toBeNull();
        });

        it("should render disabled create button if user doesn't have permission", async () => {
            jest.useRealTimers();

            const { queryByTestId } = renderList(<List canCreate={true} />, {
                can: ({ action }) => {
                    switch (action) {
                        case "create":
                            return Promise.resolve({ can: false });
                        default:
                            return Promise.resolve({ can: false });
                    }
                },
            });

            await waitFor(() =>
                expect(
                    queryByTestId(RefineButtonTestIds.CreateButton),
                ).toBeDisabled(),
            );
        });
    });
};
