import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    RefineCrudEditProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { AccessControlProvider } from "@pankod/refine-core";

import { act, ITestWrapperProps, render, TestWrapper } from "@test";

const renderEdit = (
    edit: React.ReactNode,
    accessControlProvider?: AccessControlProvider,
    wrapperProps?: ITestWrapperProps,
) => {
    return render(
        <Routes>
            <Route path="/:resource/edit/:id" element={edit} />
        </Routes>,
        {
            wrapper: TestWrapper(
                wrapperProps
                    ? wrapperProps
                    : {
                          routerInitialEntries: ["/posts/edit/1"],
                          accessControlProvider,
                      },
            ),
        },
    );
};

export const crudEditTests = function (
    Edit: React.ComponentType<
        RefineCrudEditProps<any, any, any, any, any, any, any, {}>
    >,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / CRUD Edit", () => {
        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
            jest.useFakeTimers();
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it("should render children", async () => {
            jest.useFakeTimers();

            const { getByText } = renderEdit(<Edit>Something</Edit>);

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("Something");
        });

        it("should render default list button successfuly", async () => {
            const { queryByTestId } = renderEdit(<Edit />);

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.ListButton),
            ).not.toBeNull();
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

            const { getByText } = renderEdit(
                <Edit
                    footerButtons={
                        <>
                            <button>New Save Button</button>
                            <button>New Delete Button</button>
                        </>
                    }
                />,
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("New Save Button");
            getByText("New Delete Button");
        });

        it("should render default title successfuly", async () => {
            jest.useFakeTimers();

            const { getByText } = renderEdit(<Edit />);

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("Edit Post");
        });

        it("should render custom title successfuly", async () => {
            jest.useFakeTimers();

            const { getByText } = renderEdit(<Edit title="Custom Title" />);

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("Custom Title");
        });

        it("should render optional recordItemId with resource prop", async () => {
            jest.useFakeTimers();

            const { getByText } = renderEdit(<Edit recordItemId="1" />);

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("Edit Post");
        });

        it("should render delete button ", async () => {
            jest.useFakeTimers();

            const { getByText, queryByTestId } = renderEdit(
                <Edit />,
                undefined,
                {
                    resources: [{ name: "posts", canDelete: true }],
                    routerInitialEntries: ["/posts/edit/1"],
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
    });
};
