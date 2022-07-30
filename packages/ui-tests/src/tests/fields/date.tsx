import React from "react";
import { ConfigType } from "dayjs";

import { RefineFieldDateProps } from "@pankod/refine-ui-types";

import { render } from "@test";

export const fieldDateTests = function (
    DateField: React.ComponentType<RefineFieldDateProps<ConfigType, any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Date Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

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
            const { getByText } = render(
                <DateField value={new Date("2021-05-20")} format="l" />,
            );

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
