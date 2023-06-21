import React from "react";
import { LoadingOvertimeIndicator as LoadingOvertimeIndicatorFromCore } from "@refinedev/core";
import { render } from "@testing-library/react";

const fallbackMessages = {
    3000: "It's taking a bit longer than expected.",
    5000: "This is taking longer than expected, please hang on.",
};

export const loadingOvertimeIndicatorTests = function (
    LoadingOvertimeIndicator: typeof LoadingOvertimeIndicatorFromCore,
): void {
    describe("[@refinedev/ui-tests] Common Tests / LoadingOvertimeIndicator", () => {
        describe("LoadingOvertimeIndicator", () => {
            it.each([
                [3000, fallbackMessages[3000]],
                [4000, fallbackMessages[3000]],
                [5000, fallbackMessages[5000]],
                [6000, fallbackMessages[5000]],
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
