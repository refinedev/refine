import React from "react";
import { LoadingOvertimeIndicator as LoadingOvertimeIndicatorFromCore } from "@refinedev/core";
import { render } from "@testing-library/react";

const fallbackMessages = {
    5000: "It's taking a bit longer than expected.",
    10000: "This is taking longer than expected, please hang on.",
};

export const loadingOvertimeIndicatorTests = function (
    LoadingOvertimeIndicator: typeof LoadingOvertimeIndicatorFromCore,
): void {
    describe("[@refinedev/ui-tests] Common Tests / LoadingOvertimeIndicator", () => {
        describe("LoadingOvertimeIndicator", () => {
            it.each([
                [5000, fallbackMessages[5000]],
                [7000, fallbackMessages[5000]],
                [10000, fallbackMessages[10000]],
                [12000, fallbackMessages[10000]],
            ])(
                "should render the correct message for %i",
                (elapsedTime, message) => {
                    const { getByText } = render(
                        <LoadingOvertimeIndicator elapsedTime={elapsedTime} />,
                    );

                    expect(getByText(message)).toBeInTheDocument();
                },
            );
        });
    });
};
