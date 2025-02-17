import React, { type ReactNode } from "react";
import { Route, Routes } from "react-router";

import { render, TestWrapper, type ITestWrapperProps } from "@test";

import { Breadcrumb } from "./";
import { breadcrumbTests } from "@refinedev/ui-tests";

const renderBreadcrumb = (
  children: ReactNode,
  wrapperProps: ITestWrapperProps = {},
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

const DummyDashboard = () => <div>Dashboard</div>;

describe("Breadcrumb", () => {
  beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);

  it("should render home icon", async () => {
    const { container } = renderBreadcrumb(<Breadcrumb />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/create"],
      DashboardPage: DummyDashboard,
    });

    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("should not render home icon with 'showhHome' props", async () => {
    const { container } = renderBreadcrumb(<Breadcrumb showHome={false} />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/create"],
      DashboardPage: DummyDashboard,
    });

    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("should render breadcrumb items", async () => {
    const { getByText } = renderBreadcrumb(<Breadcrumb />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/create"],
    });

    getByText("Posts");
    getByText("Create");
  });
});
