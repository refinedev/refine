import React from "react";
import { Route, Routes } from "react-router-dom";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";

import { act, ITestWrapperProps, render, TestWrapper } from "@test";

const renderBreadcrumb = (
    children: React.ReactNode,
    wrapperProps: ITestWrapperProps = {},
) => {
    return render(
        <Routes>
            <Route path="/:resource/:action" element={children} />
        </Routes>,
        {
            wrapper: TestWrapper(wrapperProps),
        },
    );
};

const DummyResourcePage = () => <div>Dummy</div>;

export const breadcrumbTests = function (
    Breadcrumb: React.ComponentType<RefineBreadcrumbProps<any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / CRUD Create", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("should render successfuly", async () => {
            const { container } = renderBreadcrumb(<Breadcrumb />);

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
        });

        it("should render breadcrumb items", async () => {
            const { getByText } = renderBreadcrumb(<Breadcrumb />, {
                resources: [{ name: "posts" }],
                routerInitialEntries: ["/posts/create"],
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByText("Posts");
            getByText("Create");
        });

        it("should render breadcrumb items with link", async () => {
            const { container } = renderBreadcrumb(<Breadcrumb />, {
                resources: [{ name: "posts", list: DummyResourcePage }],
                routerInitialEntries: ["/posts/create"],
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container.querySelector("a")?.getAttribute("href")).toBe(
                "/posts",
            );
        });

        it("should render breadcrumb items with resource icon", async () => {
            const { getByTestId } = renderBreadcrumb(<Breadcrumb />, {
                resources: [
                    {
                        name: "posts",
                        // eslint-disable-next-line react/display-name
                        icon: <div data-testid="resource-icon" />,
                    },
                ],
                routerInitialEntries: ["/posts/create"],
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            getByTestId("resource-icon");
        });

        it("should render breadcrumb items without resource icon", async () => {
            const { queryByTestId } = renderBreadcrumb(
                <Breadcrumb hideIcons />,
                {
                    resources: [
                        {
                            name: "posts",
                            icon: <div data-testid="resource-icon" />,
                        },
                    ],
                    routerInitialEntries: ["/posts/create"],
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(queryByTestId("resource-icon")).not.toBeInTheDocument();
        });
    });
};
