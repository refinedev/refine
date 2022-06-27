import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { AccessControlProvider } from "@pankod/refine-core";
import { Table, TableRow } from "@mui/material";

import { act, render, TestWrapper } from "@test";
import { List } from "./index";

const renderList = (
    list: ReactNode,
    accessControlProvider?: AccessControlProvider,
) => {
    return render(
        <Routes>
            <Route path="/:resource" element={list} />
        </Routes>,
        {
            wrapper: TestWrapper({
                routerInitialEntries: ["/posts"],
                accessControlProvider,
            }),
        },
    );
};

describe("<List/>", () => {
    beforeEach(() => {
        // This is an issue on `mui` side rather than `refine`. Ignoring for now but might need to be fixed.
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.includes?.("validateDOMNesting")) {
                return;
            }

            console.warn(message);
        });
    });

    describe("JSON Rest Server", () => {
        it("mounts with table", async () => {
            jest.useFakeTimers();

            const { getByText } = renderList(
                <List key="posts">
                    <Table key={"id"}>No Data</Table>
                </List>,
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("No Data");
        });
        it("renders given data", async () => {
            jest.useFakeTimers();

            const { container } = renderList(
                <List key="posts">
                    <Table key="id">
                        <TableRow key="title" />
                    </Table>
                </List>,
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toMatchSnapshot();
        });

        it("should render optional title with title prop", async () => {
            jest.useFakeTimers();

            const { getByText } = renderList(
                <List
                    cardHeaderProps={{
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

            const { getByText } = render(
                <Routes>
                    <Route path="/:resource" element={<List />} />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [
                            {
                                name: "posts",
                                options: { route: "posts", label: "test" },
                            },
                        ],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("Tests");
        });

        describe("render create button", () => {
            it("should create edit button", async () => {
                jest.useFakeTimers();

                const { getByText, queryByTestId } = render(
                    <Routes>
                        <Route path="/:resource" element={<List />} />
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                    create: () => null,
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                await act(async () => {
                    jest.advanceTimersToNextTimer(1);
                });

                expect(queryByTestId("list-create-button")).not.toBeNull();

                getByText("Posts");
            });

            it("should not render create button on resource canCreate false", async () => {
                jest.useFakeTimers();

                const { getByText, queryByTestId } = render(
                    <Routes>
                        <Route path="/:resource" element={<List />} />
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                await act(async () => {
                    jest.advanceTimersToNextTimer(1);
                });

                expect(queryByTestId("list-create-button")).toBeNull();

                getByText("Posts");
            });

            it("should render create button on resource canCreate false & createButtonProps props not null on component", async () => {
                jest.useFakeTimers();

                const { getByText, queryByTestId } = render(
                    <Routes>
                        <Route
                            path="/:resource"
                            element={
                                <List createButtonProps={{ size: "large" }} />
                            }
                        ></Route>
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                await act(async () => {
                    jest.advanceTimersToNextTimer(1);
                });

                expect(queryByTestId("list-create-button")).not.toBeNull();

                getByText("Posts");
            });

            it("should render create button on resource canCreate true & createButtonProps props not null on component", async () => {
                jest.useFakeTimers();

                const { getByText, queryByTestId } = render(
                    <Routes>
                        <Route
                            path="/:resource"
                            element={
                                <List createButtonProps={{ size: "large" }} />
                            }
                        ></Route>
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                    create: () => null,
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                await act(async () => {
                    jest.advanceTimersToNextTimer(1);
                });

                expect(queryByTestId("list-create-button")).not.toBeNull();

                getByText("Posts");
            });

            it("should not render create button on resource canCreate true & canCreate props false on component", async () => {
                jest.useFakeTimers();

                const { queryByTestId } = render(
                    <Routes>
                        <Route
                            path="/:resource"
                            element={<List canCreate={false} />}
                        ></Route>
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                    create: () => null,
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                await act(async () => {
                    jest.advanceTimersToNextTimer(1);
                });

                expect(queryByTestId("list-create-button")).toBeNull();
            });

            it("should render create button on resource canCreate false & canCreate props true on component", async () => {
                jest.useFakeTimers();

                const { queryByTestId } = render(
                    <Routes>
                        <Route
                            path="/:resource"
                            element={<List canCreate={true} />}
                        ></Route>
                    </Routes>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                await act(async () => {
                    jest.advanceTimersToNextTimer(1);
                });

                expect(queryByTestId("list-create-button")).not.toBeNull();
            });

            it("should render disabled create button if user doesn't have permission", async () => {
                jest.useFakeTimers();

                const { queryByTestId } = renderList(
                    <List canCreate={true} />,
                    {
                        can: ({ action }) => {
                            switch (action) {
                                case "create":
                                    return Promise.resolve({ can: false });
                                default:
                                    return Promise.resolve({ can: false });
                            }
                        },
                    },
                );

                await act(async () => {
                    jest.advanceTimersToNextTimer(1);
                });

                expect(queryByTestId("list-create-button")).toBeDisabled();
            });
            describe("Breadcrumb", () => {
                it("should not render breadcrumb", async () => {
                    jest.useFakeTimers();
                    const { queryByLabelText } = render(
                        <Routes>
                            <Route path="/:resource" element={<List />}></Route>
                        </Routes>,
                        {
                            wrapper: TestWrapper({
                                resources: [
                                    {
                                        name: "posts",
                                    },
                                ],
                                routerInitialEntries: ["/posts"],
                            }),
                        },
                    );

                    await act(async () => {
                        jest.advanceTimersToNextTimer(1);
                    });

                    expect(
                        queryByLabelText("breadcrumb"),
                    ).not.toBeInTheDocument();
                });
            });
        });
    });
});
