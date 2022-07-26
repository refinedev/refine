import React from "react";
import {
    RefineCreateButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

import { act, render, TestWrapper } from "@test";

export const buttonCreateTests = function (
    CreateButton: React.ComponentType<RefineCreateButtonProps<any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Create Button", () => {
        it("should render button successfuly", async () => {
            const { container } = render(<CreateButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<CreateButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.CreateButton),
            ).toBeTruthy();
        });
        it("should render text by children", async () => {
            const { container, getByText } = render(
                <CreateButton>refine</CreateButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(
                <CreateButton hideText />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
            expect(queryByText("Create")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, getByText } = render(
                <CreateButton>Create</CreateButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            expect(getByText("Create").closest("button")).toBeDisabled();
        });

        it("should skip access control", async () => {
            const { container, getByText } = render(
                <CreateButton ignoreAccessControlProvider>Create</CreateButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () => Promise.resolve({ can: false }),
                        },
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            expect(getByText("Create").closest("button")).not.toBeDisabled();
        });

        it("should successfully return disabled button custom title", async () => {
            const { container, getByText } = render(
                <CreateButton>Create</CreateButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: () =>
                                Promise.resolve({
                                    can: false,
                                    reason: "Access Denied",
                                }),
                        },
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            expect(getByText("Create").closest("button")).toBeDisabled();

            expect(
                getByText("Create").closest("button")?.getAttribute("title"),
            ).toBe("Access Denied");
        });
    });
};
