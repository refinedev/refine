import React from "react";

import { OptionalComponent } from "./";

import { render } from "../../../test";
describe("OptionalComponent", () => {
    it("renders correctly with optional", () => {
        const { getByText } = render(
            <OptionalComponent>
                <div>render me</div>
            </OptionalComponent>,
        );

        expect(getByText("render me")).toBeDefined();
    });

    it("renders correctly with optional", () => {
        const { getByText } = render(
            <OptionalComponent optional={() => <div>i am here! render me</div>}>
                <div>render me</div>
            </OptionalComponent>,
        );

        expect(getByText("i am here! render me")).toBeDefined();
    });

    it("renders null with optional false", () => {
        const { queryByText } = render(
            <OptionalComponent optional={false}>
                <div>render me</div>
            </OptionalComponent>,
        );

        expect(queryByText("render me")).toBeNull();
    });
});
