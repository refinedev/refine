import React from "react";
import { Row } from "antd";

import { render, MockJSONServer } from "@test";

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
            />,
        );

        getByText("Welcome on board");
    });

    it("should render correctly readyPage with ready prop", async () => {
        const readyPage = () => {
            return (
                <Row
                    align="middle"
                    justify="center"
                    data-testid="readyContainer"
                >
                    <p>readyPage rendered with ready prop</p>
                </Row>
            );
        };
        const { getByTestId, getByText } = render(
            <Refine
                authProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
                ReadyPage={readyPage}
            />,
        );
        expect(getByTestId("readyContainer")).toBeTruthy();
        getByText("readyPage rendered with ready prop");
    });
});
