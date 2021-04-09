import React from "react";
import { Row } from "antd";

import { render } from "@test";

import { ReadyPage } from "./index";

describe("ReadyPage", () => {
    it("should render page successfully", async () => {
        render(<ReadyPage />);

        expect(Row).toBeDefined();
    });

    it("should render 4 texts", async () => {
        const { getByText } = render(<ReadyPage />);

        getByText("readmin");
        getByText("Welcome to readmin");
        getByText("Your application is properly configured.");
        getByText("Now you can add a <Resource> as child of <Admin>.");
    });
});
