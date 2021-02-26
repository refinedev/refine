import React, { ReactNode } from "react";
import { Route } from "react-router-dom";

import { render, TestWrapper, MockJSONServer } from "@test";

import { TextField } from "@components";

import { Show, ShowSimple } from "./index";

const renderShow = (show: ReactNode) => {
    return render(
        <Route path="/resources/posts/show/:id">
            {/* <Show key="posts" resourceName="posts"> */}
            {show}
            {/* <ShowSimple data-testid="showsimple">
                <TextField renderRecordKey="id" />
                <TextField renderRecordKey="slug" />
            </ShowSimple> */}
            {/* </Show> */}
        </Route>,
        {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
                routerInitialEntries: ["/resources/posts/show/1"],
            }),
        },
    );
};
describe("<Show/>", () => {
    describe("JSON Rest Server", () => {
        it("renders ShowSimple with data", async () => {
            const { findByTestId, findByText } = renderShow(
                <Show key="posts" resourceName="posts">
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
            <Show key="posts" resourceName="posts" canDelete canEdit>
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
});
