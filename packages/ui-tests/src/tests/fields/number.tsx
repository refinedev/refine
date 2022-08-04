import React, { ReactChild } from "react";
import { RefineFieldNumberProps } from "@pankod/refine-ui-types";

import { render } from "@test";

export const fieldNumberTests = function (
    NumberField: React.ComponentType<RefineFieldNumberProps<ReactChild, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Number Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

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
                <NumberField
                    value={testPrice}
                    locale={locale}
                    options={options}
                />,
            );

            const formattedTestPrice = testPrice
                .toLocaleString(locale, options)
                .replace(String.fromCharCode(160), " ");

            // node 14 uses non-breaking space resulting in imcompatibility
            getByText(formattedTestPrice);
        });
    });
};
