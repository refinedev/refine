import React from "react";
import { layoutSiderTests } from "@pankod/refine-ui-tests";
import { render, fireEvent, TestWrapper, act } from "@test";

import { Sider } from "./index";

describe("Sider", () => {
    beforeAll(() => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (
                message.includes(
                    "[antd: Menu] `children` will be removed in next major version.",
                )
            ) {
                return;
            }
        });
        jest.useFakeTimers();
    });
    layoutSiderTests.bind(this)(Sider);

    it("should work sider collapse ", async () => {
        const { container } = render(<Sider />, {
            wrapper: TestWrapper({}),
        });

        await act(async () => {
            fireEvent.click(
                container.children.item(0)!.children.item(1)!
                    .firstElementChild!,
            );
        });
    });
});
