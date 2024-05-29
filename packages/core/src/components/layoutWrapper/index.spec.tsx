import React from "react";

import "@testing-library/jest-dom/extend-expect";

import { LayoutWrapper } from "@components/layoutWrapper";
import { defaultRefineOptions } from "@contexts/refine";
import {
  MockJSONServer,
  TestWrapper,
  mockLegacyRouterProvider,
  render,
} from "@test";

import type {
  IRefineContextProvider,
  LayoutProps,
} from "../../contexts/refine/types";

const renderWithRefineContext = (
  children: React.ReactNode,
  refineProvider: IRefineContextProvider,
) => {
  return render(<>{children}</>, {
    wrapper: TestWrapper({
      dataProvider: MockJSONServer,
      resources: [{ name: "posts", route: "posts" }],
      legacyRouterProvider: mockLegacyRouterProvider(),
      refineProvider,
    }),
  });
};

describe("LayoutWrapper", () => {
  it("LayoutWrapper successfully pass the custom components to Layout component as a props", () => {
    const customSiderContent = "customSiderContent";
    const CustomSider = () => <p>{customSiderContent}</p>;

    const customHeaderContent = "customHeaderContent";
    const CustomHeader = () => <p>{customHeaderContent}</p>;

    const customFooterContent = "customFooterContent";
    const CustomFooter = () => <p>{customFooterContent}</p>;

    const customOffLayoutAreaContent = "customOffLayoutAreaContent";
    const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

    const customTitleContent = "customTitleContent";
    const CustomTitle = () => <p>{customTitleContent}</p>;

    const CustomLayout: React.FC<LayoutProps> = ({
      Header,
      Sider,
      Footer,
      OffLayoutArea,
      Title,
      children,
    }) => {
      return (
        <div>
          {Header && <Header />}
          {Title && <Title collapsed={true} />}
          {Sider && <Sider />}
          {children}
          {Footer && <Footer />}
          {OffLayoutArea && <OffLayoutArea />}
        </div>
      );
    };

    const { getByText } = renderWithRefineContext(
      <LayoutWrapper>
        <div>test </div>
      </LayoutWrapper>,
      {
        hasDashboard: false,
        Layout: CustomLayout,
        Sider: CustomSider,
        Header: CustomHeader,
        Footer: CustomFooter,
        OffLayoutArea: CustomOffLayoutArea,
        Title: CustomTitle,
        ...defaultRefineOptions,
        options: defaultRefineOptions,
      },
    );

    getByText(customSiderContent);
    getByText(customHeaderContent);
    getByText(customFooterContent);
    getByText(customOffLayoutAreaContent);
    getByText(customTitleContent);
  });

  it("By default, LayoutWrapper not renders the custom components", () => {
    const customSiderContent = "customSiderContent";
    const CustomSider = () => <p>{customSiderContent}</p>;

    const customHeaderContent = "customHeaderContent";
    const CustomHeader = () => <p>{customHeaderContent}</p>;

    const customFooterContent = "customFooterContent";
    const CustomFooter = () => <p>{customFooterContent}</p>;

    const customOffLayoutAreaContent = "customOffLayoutAreaContent";
    const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

    const customTitleContent = "customTitleContent";
    const CustomTitle = () => <p>{customTitleContent}</p>;

    const { queryByText } = renderWithRefineContext(
      <LayoutWrapper>
        <div>test </div>
      </LayoutWrapper>,
      {
        hasDashboard: false,
        Sider: CustomSider,
        Header: CustomHeader,
        Footer: CustomFooter,
        OffLayoutArea: CustomOffLayoutArea,
        Title: CustomTitle,
        ...defaultRefineOptions,
        options: defaultRefineOptions,
      },
    );

    expect(queryByText(customSiderContent)).toBeNull();
    expect(queryByText(customHeaderContent)).toBeNull();
    expect(queryByText(customFooterContent)).toBeNull();
    expect(queryByText(customOffLayoutAreaContent)).toBeNull();
    expect(queryByText(customTitleContent)).toBeNull();
  });

  it("LayoutWrapper renders custom layout, sider, header, footer, title, offLayoutArea if given props", () => {
    const customTitleContent = "customTitleContent";
    const CustomTitle = () => <p>{customTitleContent}</p>;

    const CustomLayout: React.FC<LayoutProps> = ({
      Header,
      Sider,
      Footer,
      OffLayoutArea,
      children,
    }) => (
      <div>
        {Header && <Header />}
        {Sider && <Sider />}
        {children}
        <div>custom layout</div>
        {Footer && <Footer />}
        {OffLayoutArea && <OffLayoutArea />}
      </div>
    );

    const customSiderContent = "customSiderContent";
    const CustomSider = () => <p>{customSiderContent}</p>;

    const customHeaderContent = "customHeaderContent";
    const CustomHeader = () => <p>{customHeaderContent}</p>;

    const customFooterContent = "customFooterContent";
    const CustomFooter = () => <p>{customFooterContent}</p>;

    const customOffLayoutAreaContent = "customOffLayoutAreaContent";
    const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

    const { getByText } = renderWithRefineContext(
      <LayoutWrapper
        Layout={CustomLayout}
        Title={CustomTitle}
        Sider={CustomSider}
        Header={CustomHeader}
        Footer={CustomFooter}
        OffLayoutArea={CustomOffLayoutArea}
      >
        <div>test</div>
      </LayoutWrapper>,
      {
        ...defaultRefineOptions,
        options: defaultRefineOptions,
        hasDashboard: false,
      },
    );

    expect(getByText(customSiderContent));
    expect(getByText(customHeaderContent));
    expect(getByText(customFooterContent));
    expect(getByText(customOffLayoutAreaContent));
    expect(getByText("custom layout"));
  });
});
