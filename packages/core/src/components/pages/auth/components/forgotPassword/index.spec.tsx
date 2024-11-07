import React from "react";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { TestWrapper, mockLegacyRouterProvider } from "@test/index";

import { ForgotPasswordPage } from ".";
import type { AuthProvider } from "../../../../../contexts/auth/types";

const mockAuthProvider: AuthProvider = {
  login: async () => ({ success: true }),
  check: async () => ({ authenticated: true }),
  onError: async () => ({}),
  logout: async () => ({ success: true }),
};

describe("Auth Page Forgot Password", () => {
  it("should render card title", async () => {
    const { getByText } = render(<ForgotPasswordPage />, {
      wrapper: TestWrapper({}),
    });

    expect(getByText(/forgot your password?/i)).toBeInTheDocument();
  });

  it("should render email input", async () => {
    const { getByLabelText } = render(<ForgotPasswordPage />, {
      wrapper: TestWrapper({}),
    });

    expect(getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("should login link", async () => {
    const { getByRole } = render(<ForgotPasswordPage />, {
      wrapper: TestWrapper({}),
    });

    expect(
      getByRole("link", {
        name: /sign in/i,
      }),
    ).toBeInTheDocument();
  });

  it("should not render login link when is false", async () => {
    const { queryByRole } = render(<ForgotPasswordPage loginLink={false} />, {
      wrapper: TestWrapper({}),
    });

    expect(
      queryByRole("link", {
        name: /sign in/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("should render reset button", async () => {
    const { getByRole } = render(<ForgotPasswordPage />, {
      wrapper: TestWrapper({}),
    });

    expect(
      getByRole("button", {
        name: /send reset/i,
      }),
    ).toBeInTheDocument();
  });

  it("should renderContent only", async () => {
    const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
      render(
        <ForgotPasswordPage
          renderContent={() => <div data-testid="custom-content" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

    expect(queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(queryByText(/refine project/i)).not.toBeInTheDocument();
    expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
    expect(
      queryByRole("button", {
        name: /reset/i,
      }),
    ).not.toBeInTheDocument();
    expect(queryByTestId("custom-content")).toBeInTheDocument();
  });

  it("should customizable with renderContent", async () => {
    const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
      render(
        <ForgotPasswordPage
          renderContent={(content: any, title: any) => (
            <div>
              {title}
              <div data-testid="custom-content">
                <div>Custom Content</div>
              </div>
              {content}
            </div>
          )}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

    expect(queryByText(/custom content/i)).toBeInTheDocument();
    expect(queryByTestId("custom-content")).toBeInTheDocument();
    expect(queryByLabelText(/email/i)).toBeInTheDocument();
    expect(
      queryByRole("button", {
        name: /reset/i,
      }),
    ).toBeInTheDocument();
    expect(queryByTestId("custom-content")).toBeInTheDocument();
  });

  it("should run forgotPassword mutation when form is submitted", async () => {
    const forgotPasswordMock = jest.fn();
    const { getByLabelText, getByDisplayValue } = render(
      <ForgotPasswordPage />,
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            forgotPassword: forgotPasswordMock,
          },
        }),
      },
    );

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "demo@refine.dev" },
    });

    fireEvent.click(getByDisplayValue(/send reset/i));

    await waitFor(() => {
      expect(forgotPasswordMock).toBeCalledTimes(1);
    });

    expect(forgotPasswordMock).toBeCalledWith({
      email: "demo@refine.dev",
    });
  });

  it("should work with legacy router provider Link", async () => {
    const LinkComponentMock = jest.fn();

    render(<ForgotPasswordPage />, {
      wrapper: TestWrapper({
        legacyRouterProvider: {
          ...mockLegacyRouterProvider(),
          Link: LinkComponentMock,
        },
      }),
    });

    expect(LinkComponentMock).toBeCalledWith(
      {
        to: "/login",
        children: "Sign in",
      },
      {},
    );
  });

  it("should should accept 'mutationVariables'", async () => {
    const forgotPasswordMock = jest.fn().mockResolvedValue({ success: true });

    const { getByRole, getByLabelText } = render(
      <ForgotPasswordPage
        mutationVariables={{
          foo: "bar",
          xyz: "abc",
        }}
      />,
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            forgotPassword: forgotPasswordMock,
          },
        }),
      },
    );

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "demo@refine.dev" },
    });

    fireEvent.click(
      getByRole("button", {
        name: /reset/i,
      }),
    );

    await waitFor(() => {
      expect(forgotPasswordMock).toHaveBeenCalledWith({
        foo: "bar",
        xyz: "abc",
        email: "demo@refine.dev",
      });
    });
  });
});
