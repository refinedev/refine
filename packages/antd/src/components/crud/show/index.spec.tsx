import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Button } from "antd";
import { AccessControlProvider } from "@pankod/refine-core";

import { act, render, TestWrapper, waitFor } from "@test";

import { Show } from "./index";

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
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it("should render page successfuly", async () => {
        const { container } = renderShow(<Show></Show>);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();
    });

    it("should render default list and refresh buttons successfuly", async () => {
        const { container, getByText, queryByTestId } = renderShow(<Show />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container.querySelector("button")).toBeTruthy();
        expect(queryByTestId("show-list-button")).toBeTruthy();
        getByText("Refresh");
    });

    it("should render optional edit and delete buttons successfuly", async () => {
        const { container, getByText } = renderShow(<Show canEdit canDelete />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container.querySelector("button")).toBeTruthy();

        getByText("Edit");
        getByText("Delete");
    });

    it("depending on the accessControlProvider it should get the buttons successfully", async () => {
        const { getByText, queryByTestId } = renderShow(
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

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(getByText("Edit").closest("button")).not.toBeDisabled();
        expect(queryByTestId("show-list-button")).not.toBeDisabled();

        await waitFor(() =>
            expect(queryByTestId("show-delete-button")).toBeDisabled(),
        );
    });

    it("should render optional buttons with actionButtons prop", async () => {
        const { findByText } = renderShow(
            <Show
                actionButtons={
                    <>
                        <Button>New Save Button</Button>
                        <Button>New Delete Button</Button>
                    </>
                }
            />,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await findByText("New Save Button");
        await findByText("New Delete Button");
    });

    it("should render default title successfuly", async () => {
        const { getByText } = renderShow(<Show />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Show Post");
    });

    it("should render with label instead of resource name successfully", async () => {
        const { getByText } = render(
            <Routes>
                <Route path="/:resource/:action/:id" element={<Show />}></Route>
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "posts", label: "test" },
                        },
                    ],
                    routerInitialEntries: ["/posts/show/1"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Show Test");
    });

    it("should render optional title with title prop", async () => {
        const { getByText } = renderShow(<Show title="Test Title" />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Test Title");
    });

    it("should render optional resource with resource prop", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={<Show resource="posts" />}
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

        getByText("Show Post");
    });

    it("should render optional recordItemId with resource prop, not render list button", async () => {
        const { getByText, queryByTestId } = renderShow(
            <Show recordItemId="1" />,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Show Post");

        expect(queryByTestId("show-list-button")).toBeNull();
    });

    describe("render edit button", () => {
        it("should render edit button", async () => {
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

            expect(queryByTestId("show-edit-button")).not.toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit false", async () => {
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

            expect(queryByTestId("show-edit-button")).toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit true & canEdit props false on component", async () => {
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

            expect(queryByTestId("show-edit-button")).toBeNull();
        });

        it("should render edit button on resource canEdit false & canEdit props true on component", async () => {
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

            expect(queryByTestId("show-edit-button")).not.toBeNull();
        });

        it("should render edit button with recordItemId prop", async () => {
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

            expect(queryByTestId("show-edit-button")).not.toBeNull();

            getByText("Show Post");
        });
    });

    describe("render delete button", () => {
        it("should render delete button", async () => {
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

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });

        it("should not render delete button on resource canDelete false", async () => {
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

            expect(queryByTestId("show-delete-button")).toBeNull();
        });

        it("should not render delete button on resource canDelete true & canDelete props false on component", async () => {
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

            expect(queryByTestId("show-delete-button")).toBeNull();
        });

        it("should render delete button on resource canDelete false & canDelete props true on component", async () => {
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

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });

        it("should render delete button with recordItemId prop", async () => {
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

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });
    });
});
