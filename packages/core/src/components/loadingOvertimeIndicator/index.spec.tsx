import React from "react";
import { act, render } from "@testing-library/react";

import { LoadingOvertimeIndicator } from "./index";

const OvertimeComponentContents = [
    "taking some time to complete",
    "this is unexpected",
    "at this point, Im starting to lose my faith",
];

const overtimeComponents = {
    4000: <div>{OvertimeComponentContents[0]}</div>,
    8000: <div>{OvertimeComponentContents[1]}</div>,
    12000: <div>{OvertimeComponentContents[2]}</div>,
};

describe("LoadingOvertimeIndicator", () => {
    describe("when elapsedTime is passed", () => {
        it.each([0, 2000])(
            "should not render any overtime component when elapsedTime is %s",
            (elapsedTime) => {
                const { getByText, queryByText } = render(
                    <LoadingOvertimeIndicator
                        overtimeComponents={overtimeComponents}
                        elapsedTime={elapsedTime}
                    >
                        <div>content</div>
                    </LoadingOvertimeIndicator>,
                );

                expect(getByText("content")).toBeInTheDocument();
                OvertimeComponentContents.forEach((content) => {
                    expect(queryByText(content)).not.toBeInTheDocument();
                });
            },
        );

        it.each([
            { elapsedTime: 4000, content: OvertimeComponentContents[0] },
            { elapsedTime: 5000, content: OvertimeComponentContents[0] },
            { elapsedTime: 9000, content: OvertimeComponentContents[1] },
            { elapsedTime: 12000, content: OvertimeComponentContents[2] },
            {
                elapsedTime: 15000,
                content: "at this point, Im starting to lose my faith",
            },
        ] as const)(
            "should render the matching overtime component when elapsedTime is %s",
            ({ elapsedTime, content }) => {
                const { getByText } = render(
                    <LoadingOvertimeIndicator
                        overtimeComponents={overtimeComponents}
                        elapsedTime={elapsedTime}
                    >
                        <div>content</div>
                    </LoadingOvertimeIndicator>,
                );

                expect(getByText("content")).toBeInTheDocument();
                expect(getByText(content)).toBeInTheDocument();
            },
        );
    });

    describe("when `isLoading` is passed", () => {
        jest.useFakeTimers();

        it("should not render any overtime component when `isLoading` is false", () => {
            const { getByText, queryByText } = render(
                <LoadingOvertimeIndicator
                    overtimeComponents={overtimeComponents}
                    isLoading={false}
                >
                    <div>content</div>
                </LoadingOvertimeIndicator>,
            );

            expect(getByText("content")).toBeInTheDocument();
            OvertimeComponentContents.forEach((content) => {
                expect(queryByText(content)).not.toBeInTheDocument();
            });
        });

        it.each([
            { elapsedTime: 4000, content: OvertimeComponentContents[0] },
            { elapsedTime: 5000, content: OvertimeComponentContents[0] },
            { elapsedTime: 9000, content: OvertimeComponentContents[1] },
            {
                elapsedTime: 15000,
                content: OvertimeComponentContents[2],
            },
        ] as const)(
            "should render the matching overtime component when `isLoading` is true and elapsedTime is %s",
            ({ elapsedTime, content }) => {
                const { getByText } = render(
                    <LoadingOvertimeIndicator
                        overtimeComponents={overtimeComponents}
                        isLoading={true}
                    >
                        <div>content</div>
                    </LoadingOvertimeIndicator>,
                );

                act(() => {
                    jest.advanceTimersByTime(elapsedTime);
                });

                expect(getByText("content")).toBeInTheDocument();
                expect(getByText(content)).toBeInTheDocument();
            },
        );

        it("`interval` should be set via props", () => {
            const mockOnInterval = jest.fn();

            render(
                <LoadingOvertimeIndicator
                    overtimeComponents={overtimeComponents}
                    isLoading={true}
                    interval={4000}
                    onInterval={mockOnInterval}
                >
                    <div>content</div>
                </LoadingOvertimeIndicator>,
            );

            act(() => {
                jest.advanceTimersByTime(4000);
            });

            expect(mockOnInterval).toBeCalledTimes(1);

            act(() => {
                jest.advanceTimersByTime(4001);
            });

            expect(mockOnInterval).toBeCalledTimes(2);
        });
    });
});
