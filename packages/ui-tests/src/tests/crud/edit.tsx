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
        });

        it("should render children", async () => {
            const { getByText } = renderEdit(<Edit>Something</Edit>);

            getByText("Something");
        });

        it("should render default list button successfuly", async () => {
            const { queryByTestId } = renderEdit(<Edit />);

            expect(
                queryByTestId(RefineButtonTestIds.ListButton),
            ).not.toBeNull();
        });

        it("should render default save and delete buttons successfuly", async () => {
            const { container, getByText } = renderEdit(<Edit canDelete />);

            expect(container.querySelector("button")).toBeTruthy();
            getByText("Save");
            getByText("Delete");
        });

        it("should render optional buttons with actionButtons prop", async () => {
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

            getByText("New Save Button");
            getByText("New Delete Button");
        });

        it("should render default title successfuly", async () => {
            const { getByText } = renderEdit(<Edit />);

            getByText("Edit Post");
        });

        it("should render custom title successfuly", async () => {
            const { getByText } = renderEdit(<Edit title="Custom Title" />);

            getByText("Custom Title");
        });

        it("should render optional recordItemId with resource prop", async () => {
            const { getByText } = renderEdit(<Edit recordItemId="1" />);

            getByText("Edit Post");
        });

        it("should render delete button ", async () => {
            const { getByText, queryByTestId } = renderEdit(
                <Edit />,
                undefined,
                {
                    resources: [{ name: "posts", canDelete: true }],
                    routerInitialEntries: ["/posts/edit/1"],
                },
            );

            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();

            getByText("Edit Post");
        });
    });
};
