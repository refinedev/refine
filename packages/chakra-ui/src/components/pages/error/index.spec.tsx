import React from "react";
import { pageErrorTests } from "@refinedev/ui-tests";
import type ReactRouterDom from "react-router";
import { Route, Routes } from "react-router";
import userEvent from "@testing-library/user-event";

import { ErrorComponent } from ".";
import { render, fireEvent, TestWrapper } from "@test";

const mHistory = jest.fn();

jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as typeof ReactRouterDom),
  useNavigate: () => mHistory,
}));

describe("ErrorComponent", () => {
  pageErrorTests.bind(this)(ErrorComponent);

  it("renders subtitle successfully", async () => {
    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({}),
    });

    getByText("Sorry, the page you visited does not exist.");
  });

  it("renders button successfully", async () => {
    const { container, getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({}),
    });

    expect(container.querySelector("button")).toBeTruthy();
    getByText("Back Home");
  });

  it("renders called function successfully if click the button", async () => {
    const { getByText } = render(<ErrorComponent />, {
      wrapper: TestWrapper({}),
    });

    fireEvent.click(getByText("Back Home"));

    expect(mHistory).toBeCalledWith("/");
  });

  it("renders error messages if resources action's not found", async () => {
    const { getByTestId, findByText } = render(
      <Routes>
        <Route path="/:resource/:action" element={<ErrorComponent />} />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/create"],
        }),
      },
    );

    userEvent.hover(getByTestId("error-component-tooltip"));

    expect(
      await findByText(
        `You may have forgotten to add the "create" component to "posts" resource.`,
      ),
    ).toBeInTheDocument();
  });

  it("renders error messages if resource action's is different from 'create, edit, show'", async () => {
    const { getByText } = render(
      <Routes>
        <Route path="/:resource/:action" element={<ErrorComponent />} />
      </Routes>,
      {
        wrapper: TestWrapper({
          routerInitialEntries: ["/posts/invalidActionType"],
        }),
      },
    );

    getByText("Sorry, the page you visited does not exist.");
  });
});
