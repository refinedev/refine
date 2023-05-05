import React from "react";
import { render } from "@testing-library/react";
import { Grid } from "antd";

import { TestWrapper } from "@test/index";
import { ThemedSiderV2 } from "./index";

describe("Sider", () => {
    it("if fixed is true, should render fixed sider with correct styles", () => {
        const useBreakpointSpy = jest
            .spyOn(Grid, "useBreakpoint")
            .mockReturnValue({
                xs: true,
                sm: true,
                md: true,
                lg: true,
                xl: true,
                xxl: true,
            });

        const { container } = render(<ThemedSiderV2 fixed />, {
            wrapper: TestWrapper({}),
        });

        expect(useBreakpointSpy).toBeCalledTimes(1);
        expect(container.querySelector(".ant-layout-sider")).toHaveStyle({
            position: "fixed",
            height: "100vh",
        });
    });
});
