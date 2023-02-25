import React from "react";

import {
    render,
    MockJSONServer,
    mockLegacyRouterProvider,
    mockRouterBindings,
    TestWrapper,
} from "@test";

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
    it("should render without resource [legacy router provider]", async () => {
        const { getByText } = render(
            <Refine
                legacyAuthProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
                legacyRouterProvider={mockLegacyRouterProvider()}
            />,
        );

        getByText("Welcome on board");
    });

    it("should render correctly readyPage with ready prop [legacy router provider]", async () => {
        const readyPage = () => {
            return (
                <div data-testid="readyContainer">
                    <p>readyPage rendered with ready prop</p>
                </div>
            );
        };
        const { getByTestId, getByText } = render(
            <Refine
                legacyAuthProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
                legacyRouterProvider={mockLegacyRouterProvider()}
                ReadyPage={readyPage}
            />,
        );
        expect(getByTestId("readyContainer")).toBeTruthy();
        getByText("readyPage rendered with ready prop");
    });

    it("should render resource prop list page [legacy router provider]", async () => {
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
                legacyRouterProvider: mockLegacyRouterProvider(),
            }),
        });

        expect(container).toBeDefined();
        getByText("Posts");
    });

    it("should render the children", async () => {
        const { getByTestId } = render(
            <Refine
                legacyAuthProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
                routerProvider={mockRouterBindings()}
            >
                <div data-testid="children">Children</div>
            </Refine>,
        );

        expect(getByTestId("children")).toBeTruthy();
    });
});
