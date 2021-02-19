import React from "react";

import { NumberField } from "./";

import { render } from "@test";
describe("NumberField", () => {
    it("renders numbers with given formatting", () => {
        const testPrice = 12345.6789;
        const options = {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
        };
        const locale = "de-DE";

        const { getByText } = render(
            <NumberField value={testPrice} locale={locale} options={options} />,
        );

        getByText(testPrice.toLocaleString(locale, options));
    });
});
