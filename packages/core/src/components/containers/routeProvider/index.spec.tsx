import React from "react";
import { wait } from "@testing-library/react";

import { MockJSONServer, render, TestWrapper, act, fireEvent } from "@test";
import { RouteProvider } from "./";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            fullName: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
};

describe("RouteProvider", () => {
    it("should render resource link successfully", async () => {
        const { findByText } = render(
            <RouteProvider
                resources={[
                    {
                        name: "post",
                    },
                ]}
            />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [
                        {
                            name: "posts",
                            route: "posts",
                        },
                    ],
                }),
            },
        );

        await act(async () => {
            await findByText("Posts");
        });
    });

    it("should render custom dashboard screen successfully", async () => {
        const DashboardPage: React.FC = () => (
            <span>Custom Dashboard Page</span>
        );

        const { findByText, getByLabelText, getByText } = render(
            <RouteProvider
                resources={[
                    {
                        name: "post",
                    },
                ]}
                DashboardPage={DashboardPage}
            />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [
                        {
                            name: "posts",
                            route: "posts",
                        },
                    ],
                }),
            },
        );

        await act(async () => {
            await findByText("Posts");
        });

        await wait(async () => {
            await findByText("Custom Dashboard Page");
        });
    });

    it("should render crud component successfully", async () => {
        const List: React.FC = () => <span>List</span>;
        const Create: React.FC = () => <span>Show</span>;
        const Edit: React.FC = () => <span>Edit</span>;
        const Show: React.FC = () => <span>Show</span>;

        const { findByText } = render(
            <RouteProvider
                resources={[
                    {
                        name: "post",
                        list: List,
                        edit: Edit,
                        create: Create,
                        show: Show,
                    },
                ]}
            />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: mockAuthProvider,
                    resources: [
                        {
                            name: "posts",
                            route: "posts",
                        },
                    ],
                }),
            },
        );

        await wait(async () => {
            await findByText("List");
        });
    });

    it("should render unauthorized successfully", async () => {
        const { findByText } = render(
            <RouteProvider
                resources={[
                    {
                        name: "post",
                    },
                ]}
            />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    authProvider: {
                        ...mockAuthProvider,
                        checkAuth: () => Promise.reject(),
                    },
                    resources: [
                        {
                            name: "posts",
                            route: "posts",
                        },
                    ],
                }),
            },
        );

        await wait(async () => {
            await findByText("Sign in");
        });
    });
});
