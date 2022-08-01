import React from "react";
import { pageReadyTests } from "@pankod/refine-ui-tests";

import Button from "@mui/material/Button";

import { act, render } from "@test";

import { ReadyPage } from "./index";

describe("ReadyPage", () => {
    pageReadyTests.bind(this)(ReadyPage);

    it("should render 3 texts", async () => {
        jest.useFakeTimers();

        const { getByText } = render(<ReadyPage />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        getByText("Welcome on board");
        getByText("Your configuration is completed.");
    });

    it("should render 3 buttons", async () => {
        jest.useFakeTimers();

        const { getByText } = render(<ReadyPage />);

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(Button).toBeDefined();

        expect(getByText("Documentation").closest("a")).toHaveAttribute(
            "href",
            "https://refine.dev",
        );
        expect(getByText("Examples").closest("a")).toHaveAttribute(
            "href",
            "https://refine.dev/docs/examples/tutorial",
        );
        expect(getByText("Community").closest("a")).toHaveAttribute(
            "href",
            "https://discord.gg/refine",
        );
    });
});
