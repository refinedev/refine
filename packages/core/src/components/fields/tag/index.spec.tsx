import React from "react";

import { TagField } from "./";

import { render } from "@test";
describe("TagField", () => {
    it("renders boolean values correctly", () => {
        const { getByText } = render(<TagField value={123} />);

        getByText("true");
    });
});
