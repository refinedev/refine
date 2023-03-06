import React from "react";
import { ConfigType } from "dayjs";

import { RefineFieldDateProps } from "@refinedev/ui-types";

import { render } from "@test";

import "dayjs/locale/tr";

export const fieldDateTests = function (
    DateField: React.ComponentType<RefineFieldDateProps<ConfigType, any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Date Field", () => {
        it("renders date with default format", () => {
            const { getByText } = render(
                <DateField value={new Date("2021-05-20")} />,
            );

            getByText("05/20/2021");
        });

        it("renders date with given format", () => {
            const { getByText } = render(
                <DateField
                    value={new Date("2021-05-20")}
                    format="DD/MM/YYYY"
                />,
            );

            getByText("20/05/2021");
        });

        it("renders date with given  LocalizedFormat", () => {
            const { getByText, rerender } = render(
                <DateField
                    value={new Date("2021-05-20")}
                    format="l"
                    locales="tr"
                />,
            );

            getByText("20.5.2021");

            rerender(<DateField value={new Date("2021-05-20")} format="l" />);

            getByText("5/20/2021");
        });

        it("renders invalid date with given incorrect date", () => {
            const { getByText } = render(
                <DateField value={new Date("test")} />,
            );

            getByText("Invalid Date");
        });
    });
};
