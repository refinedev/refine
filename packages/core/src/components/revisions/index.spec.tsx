import React from "react";
import { wait } from "@testing-library/react";

import { MockJSONServer, render, TestWrapper } from "@test";
import { Revisions } from "./";

describe("Revisions", () => {
    it("should render revisions successfully", async () => {
        const { findByText, getByText } = render(
            <Revisions resource="posts" id="1" />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        getByText("Revision History");

        await wait();

        findByText("Created");
    });

    it("should render not configured successfully", async () => {
        const dataProvider = { ...MockJSONServer };
        dataProvider.revisions = undefined;

        const { getByText } = render(<Revisions resource="posts" id="1" />, {
            wrapper: TestWrapper({
                dataProvider,
                resources: [{ name: "posts" }],
            }),
        });

        getByText("Revision History is not configured.");
    });
});
