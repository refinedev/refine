import React from "react";
import { RefineLayoutLayoutProps } from "@pankod/refine-ui-types";

import { act, render, TestWrapper } from "@test";

export const layoutLayoutTests = function (
    LayoutElement: React.ComponentType<RefineLayoutLayoutProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Layout Element", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("Layout renders sider, header, footer, title, offLayoutArea if given props", async () => {
            const customTitleContent = "customTitleContent";
            const CustomTitle = () => <p>{customTitleContent}</p>;

            const customSiderContent = "customSiderContent";
            const CustomSider = () => <p>{customSiderContent}</p>;

            const customHeaderContent = "customHeaderContent";
            const CustomHeader = () => <p>{customHeaderContent}</p>;

            const customFooterContent = "customFooterContent";
            const CustomFooter = () => <p>{customFooterContent}</p>;

            const customOffLayoutAreaContent = "customOffLayoutAreaContent";
            const CustomOffLayoutArea = () => (
                <p>{customOffLayoutAreaContent}</p>
            );

            const { getByText } = render(
                <LayoutElement
                    Title={CustomTitle}
                    Sider={CustomSider}
                    Header={CustomHeader}
                    Footer={CustomFooter}
                    OffLayoutArea={CustomOffLayoutArea}
                />,
                { wrapper: TestWrapper({}) },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(getByText(customSiderContent));
            expect(getByText(customHeaderContent));
            expect(getByText(customFooterContent));
            expect(getByText(customOffLayoutAreaContent));
        });
    });
};
