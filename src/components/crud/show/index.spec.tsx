import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";

import { TextField } from "@components";

import { Show, ShowSimple } from "./index";

const renderShow = (show: ReactNode) => {
    return render(<Route path="/resources/:resource/show/:id">{show}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/resources/posts/show/1"],
        }),
    });
};
describe("<Show/>", () => {
    describe("JSON Rest Server", () => {
        it("renders ShowSimple with data", async () => {
            const { findByTestId, findByText } = renderShow(
                <Show key="posts">
                    <ShowSimple data-testid="showsimple">
                        <TextField renderRecordKey="id" />
                        <TextField renderRecordKey="slug" />
                    </ShowSimple>
                </Show>,
            );

            await findByTestId("showsimple");
            await findByText("ut-ad-et");
        });
    });

    it("renders list, refresh, delete, edit buttons", async () => {
        const { findByText } = renderShow(
            <Show key="posts" canDelete canEdit>
                <ShowSimple data-testid="showsimple">
                    <TextField renderRecordKey="id" />
                    <TextField renderRecordKey="slug" />
                </ShowSimple>
            </Show>,
        );
        await findByText("Refresh");
        await findByText("Posts");
        await findByText("Delete");
        await findByText("Edit");
    });

    it("should render optional buttons with actionButtons prop", async () => {
        const { findByText } = renderShow(
            <Show
                key="posts"
                actionButtons={
                    <>
                        <Button>New Save Button</Button>
                        <Button>New Delete Button</Button>
                    </>
                }
            />,
        );

        await findByText("New Save Button");
        await findByText("New Delete Button");
    });
});
