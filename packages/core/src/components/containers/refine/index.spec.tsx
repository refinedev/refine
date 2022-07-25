import React from "react";

import { render, MockJSONServer, MockRouterProvider, TestWrapper } from "@test";

import { Refine } from "./index";

const mockAuthProvider = {
    login: (params: any) => {
        if (params.username === "admin") {
            localStorage.setItem("username", params.username);
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            fullName: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
};

describe("Refine Container", () => {
    it("should render without resource", async () => {
        const { getByText } = render(
            <Refine
                authProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
                routerProvider={MockRouterProvider}
            />,
        );

        getByText("Welcome on board");
    });

    it("should render correctly readyPage with ready prop", async () => {
        const readyPage = () => {
            return (
                <div data-testid="readyContainer">
                    <p>readyPage rendered with ready prop</p>
                </div>
            );
        };
        const { getByTestId, getByText } = render(
            <Refine
                authProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
                routerProvider={MockRouterProvider}
                ReadyPage={readyPage}
            />,
        );
        expect(getByTestId("readyContainer")).toBeTruthy();
        getByText("readyPage rendered with ready prop");
    });

    it("should render resource prop list page", async () => {
        const PostList = () => {
            return (
                <>
                    <h1>Posts</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>foo</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            );
        };

        const { container, getByText } = render(<PostList />, {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeDefined();
        getByText("Posts");
    });
});
