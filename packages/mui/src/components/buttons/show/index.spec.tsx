import React from "react";
import { Route, Routes } from "react-router-dom";

import { act, fireEvent, render, TestWrapper } from "@test";
import { ShowButton } from "./";

describe("Show Button", () => {
    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(jest.fn());
        jest.useFakeTimers();
    });
    const show = jest.fn();

    it("should render button successfuly", async () => {
        const { container, getByText } = render(
            <ShowButton onClick={() => show()} />,
            {
                wrapper: TestWrapper({}),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        getByText("Show");
    });

    it("should render text by children", async () => {
        const { container, getByText } = render(
            <ShowButton>refine</ShowButton>,
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
        const { container, queryByText } = render(<ShowButton hideText />, {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(queryByText("Show")).not.toBeInTheDocument();
    });

    it("should be disabled when user not have access", async () => {
        const { container, getByText } = render(<ShowButton>Show</ShowButton>, {
            wrapper: TestWrapper({
                accessControlProvider: {
                    can: () => Promise.resolve({ can: false }),
                },
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("Show").closest("button")).toBeDisabled();
    });

    it("should be disabled when recordId not allowed", async () => {
        const { container, getByText } = render(
            <ShowButton recordItemId="1">Show</ShowButton>,
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: ({ params }) => {
                            if (params?.id === "1") {
                                return Promise.resolve({ can: false });
                            }
                            return Promise.resolve({ can: true });
                        },
                    },
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("Show").closest("button")).toBeDisabled();
    });

    it("should skip access control", async () => {
        const { container, getByText } = render(
            <ShowButton ignoreAccessControlProvider>Show</ShowButton>,
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

        expect(getByText("Show").closest("button")).not.toBeDisabled();
    });

    it("should successfully return disabled button custom title", async () => {
        const { container, getByText } = render(<ShowButton>Show</ShowButton>, {
            wrapper: TestWrapper({
                accessControlProvider: {
                    can: () =>
                        Promise.resolve({
                            can: false,
                            reason: "Access Denied",
                        }),
                },
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(container).toBeTruthy();

        expect(getByText("Show").closest("button")).toBeDisabled();
        expect(getByText("Show").closest("button")?.getAttribute("title")).toBe(
            "Access Denied",
        );
    });

    it("should render called function successfully if click the button", async () => {
        const { getByText } = render(<ShowButton onClick={() => show()} />, {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Show"));
        });

        expect(show).toHaveBeenCalledTimes(1);
    });

    it("should create page redirect show route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={<ShowButton recordItemId="1" />}
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Show"));
        });

        expect(window.location.pathname).toBe("/posts/show/1");
    });

    it("should edit page redirect show route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route path="/:resource/:action/:id" element={<ShowButton />} />
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

        await act(async () => {
            fireEvent.click(getByText("Show"));
        });

        expect(window.location.pathname).toBe("/posts/show/1");
    });

    it("should redirect with custom route called function successfully if click the button", async () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={
                        <ShowButton
                            resourceNameOrRouteName="custom-route-posts"
                            recordItemId="1"
                        />
                    }
                />
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "custom-route-posts" },
                        },
                        { name: "posts" },
                    ],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await act(async () => {
            fireEvent.click(getByText("Show"));
        });

        expect(window.location.pathname).toBe("/custom-route-posts/show/1");
    });
});
