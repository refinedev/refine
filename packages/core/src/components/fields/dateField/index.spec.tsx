import React from "react";

import { DateField } from "./";
import { render } from "@test";

describe("DateField", () => {
    it("renders date with default format", () => {
        const { getByText } = render(
            <DateField value={new Date("2021-05-20")} />,
        );

        getByText("05/20/2021");
    });

    it("renders date with given format", () => {
        const { getByText } = render(
            <DateField value={new Date("2021-05-20")} format="DD/MM/YYYY" />,
        );

        getByText("20/05/2021");
    });

    it("renders date with given  LocalizedFormat", () => {
        const { getByText } = render(
            <DateField value={new Date("2021-05-20")} format="l" />,
        );

        getByText("5/20/2021");
    });

    it("renders invalid date with given incorrect date", () => {
        const { getByText } = render(<DateField value={new Date("test")} />);

        getByText("Invalid Date");
    });
});
