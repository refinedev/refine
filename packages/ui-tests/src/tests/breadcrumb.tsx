import React from "react";
import { Route, Routes } from "react-router";
import type { RefineBreadcrumbProps } from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  render,
  TestWrapper as DefaultTestWrapper,
} from "@test";

const renderBreadcrumb = (
  children: React.ReactNode,
  wrapperProps: ITestWrapperProps = {},
  TestWrapper: (props: ITestWrapperProps) => React.FC = DefaultTestWrapper,
) => {
  return render(
    <Routes>
      <Route path="/:resource/:action" element={children} />
    </Routes>,
    {
      wrapper: TestWrapper(wrapperProps),
    },
  );
};

const DummyResourcePage = () => <div>Dummy</div>;

export const breadcrumbTests = (
  Breadcrumb: React.ComponentType<RefineBreadcrumbProps<any>>,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / CRUD Create", () => {
    it("should not render breadcrumb when no items are present", async () => {
      const { container } = renderBreadcrumb(<Breadcrumb />);

      expect(container).toBeEmptyDOMElement();
    });

    it("should not render breadcrumb when the number of items is lower than minItems", async () => {
      const { container } = renderBreadcrumb(
        <Breadcrumb minItems={2} />,
        {
          resources: [{ name: "posts" }],
          routerInitialEntries: ["/posts"],
        },
        TestWrapper,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("should render breadcrumb when the number of items is greater than or equal to minItems", async () => {
      const { getByText } = renderBreadcrumb(
        <Breadcrumb minItems={2} />,
        {
          resources: [{ name: "posts" }],
          routerInitialEntries: ["/posts/create"],
        },
        TestWrapper,
      );

      expect(getByText("Posts")).toBeInTheDocument();
      expect(getByText("Create")).toBeInTheDocument();
    });

    it("should render breadcrumb items with link", async () => {
      const { container } = renderBreadcrumb(
        <Breadcrumb />,
        {
          resources: [{ name: "posts", list: DummyResourcePage }],
          routerInitialEntries: ["/posts/create"],
        },
        TestWrapper,
      );

      const link = container.querySelector("a");
      expect(link).toHaveAttribute("href", "/posts");
    });

    it("should render breadcrumb items with resource icon", async () => {
      const { getByTestId } = renderBreadcrumb(
        <Breadcrumb />,
        {
          resources: [
            {
              name: "posts",
              icon: <div data-testid="resource-icon" />,
            },
          ],
          routerInitialEntries: ["/posts/create"],
        },
        TestWrapper,
      );

      expect(getByTestId("resource-icon")).toBeInTheDocument();
    });

    it("should render breadcrumb items without resource icon", async () => {
      const { queryByTestId } = renderBreadcrumb(
        <Breadcrumb hideIcons />,
        {
          resources: [
            {
              name: "posts",
              icon: <div data-testid="resource-icon" />,
            },
          ],
          routerInitialEntries: ["/posts/create"],
        },
        TestWrapper,
      );

      expect(queryByTestId("resource-icon")).not.toBeInTheDocument();
    });
  });
};
