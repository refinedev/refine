import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { AccessControlProvider } from "@pankod/refine-core";

import { act, render, TestWrapper } from "@test";
import { Edit } from "./";
import { crudEditTests } from "@pankod/refine-ui-tests";

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
    beforeAll(() => {
        jest.useFakeTimers();
    });

    crudEditTests.bind(this)(Edit);

    it("should render optional mutationMode with mutationModeProp prop", async () => {
        const container = renderEdit(<Edit mutationMode="undoable" />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-delete-button")).not.toBeNull();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-delete-button")).toBeNull();

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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-delete-button")).toBeNull();
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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-delete-button")).not.toBeNull();
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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-delete-button")).not.toBeNull();
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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-list-button")).not.toBeDisabled();
            expect(queryByTestId("edit-delete-button")).toBeDisabled();
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

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("edit-list-button")).toBeDisabled();
            expect(queryByTestId("edit-delete-button")).toBeDisabled();
        });
    });
});
