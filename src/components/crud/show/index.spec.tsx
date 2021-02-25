import React from "react";
import { Route } from "react-router-dom";

import { render, TestWrapper, MockJSONServer } from "@test";

import { TextField } from "@components";

import { Show, ShowSimple } from "./index";

describe("<Show/>", () => {
    describe("JSON Rest Server", () => {
        it("renders ShowSimple with data", async () => {
            const { findByTestId, findByText } = render(
                <Route path="/resources/posts/show/:id">
                    <Show key="posts" resourceName="posts">
                        <ShowSimple data-testid="showsimple">
                            <TextField renderRecordKey="id" />
                            <TextField renderRecordKey="slug" />
                        </ShowSimple>
                    </Show>
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/resources/posts/show/1"],
                    }),
                },
            );

            await findByTestId("showsimple");
            await findByText("ut-ad-et");
        });
    });
});
