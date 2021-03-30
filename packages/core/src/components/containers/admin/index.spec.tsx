import React from "react";

import { ReadyPage } from "@components/pages";

import { render, MockJSONServer } from "@test";
import { Row } from "antd";

import { Admin } from "./index";

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
            avatar:
                "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
};

describe("Admin Container", () => {
    xit("should render without resource", async () => {
        render(
            <Admin
                authProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
            />,
        );
        expect(ReadyPage).toBeTruthy();
    });

    xit("should render correctly readyPage with ready prop", async () => {
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
            <Admin
                authProvider={mockAuthProvider}
                dataProvider={MockJSONServer}
                ready={readyPage}
            />,
        );
        expect(getByTestId("readyContainer")).toBeTruthy();
        getByText("readyPage rendered with ready prop");
    });
});
