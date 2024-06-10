import React from "react";
import { render } from "@testing-library/react";
import type * as Grid from "antd/lib/grid";

import { TestWrapper } from "@test/index";
import { ThemedSiderV2 } from "./index";
import { layoutSiderTests } from "@refinedev/ui-tests";
import { ConfigProvider } from "antd";

jest.mock("antd/lib/grid", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual<typeof Grid>("antd/lib/grid");

  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      useBreakpoint: () => {
        return {
          xs: true,
          sm: true,
          md: true,
          lg: true,
          xl: true,
          xxl: true,
        };
      },
    },
  };
});

describe("Sider", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  layoutSiderTests.bind(this)(ThemedSiderV2);

  it("if fixed is true, should render fixed sider with correct styles", () => {
    jest.restoreAllMocks();

    const { container } = render(<ThemedSiderV2 fixed />, {
      wrapper: TestWrapper({}),
    });

    expect(container.querySelector(".ant-layout-sider")).toHaveStyle({
      position: "fixed",
      height: "100vh",
    });
  });

  it("should render sider trigger with respect to direction from config", async () => {
    const { rerender, container } = render(
      <ConfigProvider>
        <ThemedSiderV2 />
      </ConfigProvider>,
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(
      container.querySelector(
        ".ant-layout-sider-trigger .anticon.anticon-left",
      ),
    ).toBeTruthy();
    expect(
      container.querySelector(
        ".ant-layout-sider-trigger .anticon.anticon-right",
      ),
    ).toBeFalsy();

    rerender(
      <ConfigProvider direction="rtl">
        <ThemedSiderV2 />
      </ConfigProvider>,
    );

    expect(
      container.querySelector(
        ".ant-layout-sider-trigger .anticon.anticon-right",
      ),
    ).toBeTruthy();
    expect(
      container.querySelector(
        ".ant-layout-sider-trigger .anticon.anticon-left",
      ),
    ).toBeFalsy();
  });
});
