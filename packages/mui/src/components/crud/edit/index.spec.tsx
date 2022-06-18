import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { AccessControlProvider } from "@pankod/refine-core";
import { Button } from "@mui/material";

import { act, render, TestWrapper } from "@test";
import { Edit } from "./";

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
    it("should render page successfuly", async () => {
        jest.useFakeTimers();

        const { container, queryByTestId } = renderEdit(<Edit />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(queryByTestId("edit-list-button")).not.toBeNull();

        expect(container).toBeTruthy();
    });

    it("should render default save button successfuly", async () => {
        jest.useFakeTimers();

        const { container, getByText } = renderEdit(<Edit />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
    });

    it("should render default save and delete buttons successfuly", async () => {
        jest.useFakeTimers();

        const { container, getByText } = renderEdit(<Edit canDelete />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
        getByText("Delete");
    });

    it("should render optional buttons with actionButtons prop", async () => {
        jest.useFakeTimers();

        const { getByText, queryByTestId } = renderEdit(
            <Edit
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

        getByText("New Save Button");
        getByText("New Delete Button");
        expect(queryByTestId("edit-delete-button")).toBeNull();
    });

    it("should render default title successfuly", async () => {
        jest.useFakeTimers();

        const { getByText } = renderEdit(<Edit />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Edit Post");
    });

    it("should render with label instead of resource name successfully", async () => {
        jest.useFakeTimers();

        const { getByText } = render(
            <Routes>
                <Route path="/:resource/edit/:id" element={<Edit />} />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "posts", label: "test" },
                        },
                    ],
                    routerInitialEntries: ["/posts/edit/1"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Edit Test");
    });

    it("should render optional title with title prop", async () => {
        jest.useFakeTimers();

        const { getByText } = renderEdit(
            <Edit
                cardHeaderProps={{
                    title: "New Title",
                }}
            />,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("New Title");
    });

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

    it("should render optional recordItemId with resource prop", async () => {
        jest.useFakeTimers();

        const { getByText, queryByTestId } = renderEdit(
            <Edit recordItemId="1" />,
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Edit Post");

        expect(queryByTestId("edit-list-button")).toBeNull();
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

            expect(queryByTestId("edit-delete-button")).not.toBeNull();

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

            expect(queryByTestId("edit-delete-button")).toBeNull();

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

            expect(queryByTestId("edit-delete-button")).toBeNull();
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

            expect(queryByTestId("edit-delete-button")).not.toBeNull();
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

            expect(queryByTestId("edit-delete-button")).not.toBeNull();
        });
    });

    describe("accessibility of buttons by accessControlProvider", () => {
        it("should render disabled list button and not disabled delete button", async () => {
            jest.useFakeTimers();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-list-button")).not.toBeDisabled();
            expect(queryByTestId("edit-delete-button")).toBeDisabled();
        });

        it("should render disabled list button and delete button", async () => {
            jest.useFakeTimers();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-list-button")).toBeDisabled();
            expect(queryByTestId("edit-delete-button")).toBeDisabled();
        });
    });
});
