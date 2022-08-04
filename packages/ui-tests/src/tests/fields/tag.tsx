import React, { ReactNode } from "react";
import { RefineFieldTagProps } from "@pankod/refine-ui-types";

import { render } from "@test";

export const fieldTagTests = function (
    TagField: React.ComponentType<RefineFieldTagProps<ReactNode, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Tag Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("renders boolean values correctly", () => {
            const { getByText } = render(<TagField value={true} />);

            getByText("true");
        });

        it("renders boolean values correctly", () => {
            const { queryByText } = render(<TagField value={undefined} />);

            expect(queryByText("true")).toBeNull();
        });
    });
};
