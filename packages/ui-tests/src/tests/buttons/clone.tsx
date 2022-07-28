import React from "react";
import {
    RefineCloneButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

import { act, fireEvent, render, TestWrapper } from "@test";

export const buttonCloneTests = function (
    CloneButton: React.ComponentType<RefineCloneButtonProps<any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Clone Button", () => {
        it("should render button successfuly", async () => {
            const { container } = render(<CloneButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<CloneButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId(RefineButtonTestIds.CloneButton)).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <CloneButton>refine</CloneButton>,
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
                <CloneButton hideText />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            expect(queryByText("Clone")).not.toBeInTheDocument();
        });

        it("should be disabled when user not have access", async () => {
            const { container, findByText } = render(
                <CloneButton>Clone</CloneButton>,
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

            const btn = (await findByText("Clone")).closest("button");

            expect(btn).toBeDisabled();
        });

        it("should be disabled when recordId not allowed", async () => {
            const { container, findByText } = render(
                <CloneButton recordItemId="1">Clone</CloneButton>,
                {
                    wrapper: TestWrapper({
                        accessControlProvider: {
                            can: ({ params }) => {
                                if (params?.id === "1") {
                                    return Promise.resolve({ can: false });
                                }
                                return Promise.resolve({ can: false });
                            },
                        },
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            const btn = (await findByText("Clone")).closest("button");

            expect(btn).toBeDisabled();
        });

        it("should skip access control", async () => {
            const { container, getByText } = render(
                <CloneButton ignoreAccessControlProvider>Clone</CloneButton>,
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

            expect(getByText("Clone").closest("button")).not.toBeDisabled();
        });

        it("should successfully return disabled button custom title", async () => {
            const { container, getByText } = render(
                <CloneButton>Clone</CloneButton>,
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

            expect(getByText("Clone").closest("button")).toBeDisabled();
            expect(
                getByText("Clone").closest("button")?.getAttribute("title"),
            ).toBe("Access Denied");
        });

        it("should render called function successfully if click the button", async () => {
            const clone = jest.fn();

            const { getByText } = render(
                <CloneButton onClick={() => clone()} recordItemId="1" />,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            await act(async () => {
                fireEvent.click(getByText("Clone"));
            });

            expect(clone).toHaveBeenCalledTimes(1);
        });
    });
};
