import React from "react";

import { TagField } from "./";

import { render } from "@test";
describe("TagField", () => {
    it("renders boolean values correctly", () => {
        const { getByText } = render(<TagField value={true} />);

        getByText("true");
    });

    it("renders boolean values correctly", () => {
        const { queryByText } = render(<TagField value={undefined} />);

        expect(queryByText("true")).toBeNull();
    });
});
