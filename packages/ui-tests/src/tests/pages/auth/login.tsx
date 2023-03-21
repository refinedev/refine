import React, { FC } from "react";

import { render, TestWrapper } from "@test";
import { LoginPageProps } from "@refinedev/core";

export const pageLoginTests = function (
    LoginPage: FC<LoginPageProps<any, any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Login Page", () => {
        it("should render card title", async () => {
            const { getByText } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByText(/sign in to your account/i)).toBeInTheDocument();
        });

        it("should render card email and password input", async () => {
            const { getByLabelText } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByLabelText(/email/i)).toBeInTheDocument();
            expect(getByLabelText(/password/i)).toBeInTheDocument();
        });

        it("should render providers", async () => {
            const { getByText } = render(
                <LoginPage
                    providers={[
                        {
                            name: "Google",
                            label: "Google",
                        },
                        {
                            name: "Github",
                            label: "Github",
                        },
                    ]}
                />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(getByText(/google/i)).toBeInTheDocument();
            expect(getByText(/github/i)).toBeInTheDocument();
        });

        it("should register link", async () => {
            const { getByRole } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(
                getByRole("link", {
                    name: /sign up/i,
                }),
            ).toBeInTheDocument();
        });

        it("should not render register link when is false", async () => {
            const { queryByRole } = render(<LoginPage registerLink={false} />, {
                wrapper: TestWrapper({}),
            });

            expect(
                queryByRole("link", {
                    name: /sign up/i,
                }),
            ).not.toBeInTheDocument();
        });

        it("should forgotPassword link", async () => {
            const { getByRole } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(
                getByRole("link", {
                    name: /forgot password?/i,
                }),
            ).toBeInTheDocument();
        });

        it("should not render forgotPassword link when is false", async () => {
            const { queryByRole } = render(
                <LoginPage forgotPasswordLink={false} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(
                queryByRole("link", {
                    name: /forgot password/i,
                }),
            ).not.toBeInTheDocument();
        });

        it("should render remember me", async () => {
            const { queryByRole } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(
                queryByRole("checkbox", {
                    name: /remember me/i,
                }),
            ).toBeInTheDocument();
        });

        it("should not render remember me when is false", async () => {
            const { queryByRole } = render(<LoginPage rememberMe={false} />, {
                wrapper: TestWrapper({}),
            });

            expect(
                queryByRole("checkbox", {
                    name: /remember me/i,
                }),
            ).not.toBeInTheDocument();
        });

        it("should render sign in button", async () => {
            const { getByRole } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(
                getByRole("button", {
                    name: /sign in/i,
                }),
            ).toBeInTheDocument();
        });

        it("should render default <ThemedTitle> with icon", async () => {
            const { getByText, getByTestId } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByText(/refine project/i)).toBeInTheDocument();
            expect(getByTestId("refine-logo")).toBeInTheDocument();
        });

        it("should render custom title", async () => {
            const { queryByText, queryByTestId } = render(
                <LoginPage title="Custom Title" />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(queryByText(/custom title/i)).toBeInTheDocument();
            expect(queryByText(/refine project/i)).not.toBeInTheDocument();
            expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
        });

        it("should renderContent only", async () => {
            const {
                queryByText,
                queryByTestId,
                queryByRole,
                queryByLabelText,
            } = render(
                <LoginPage
                    renderContent={() => <div data-testid="custom-content" />}
                />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(queryByLabelText(/email/i)).not.toBeInTheDocument();
            expect(queryByLabelText(/password/i)).not.toBeInTheDocument();
            expect(queryByText(/refine project/i)).not.toBeInTheDocument();
            expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
            expect(
                queryByRole("button", {
                    name: /sign in/i,
                }),
            ).not.toBeInTheDocument();
            expect(queryByTestId("custom-content")).toBeInTheDocument();
        });

        it("should customizable with renderContent", async () => {
            const {
                queryByText,
                queryByTestId,
                queryByRole,
                queryByLabelText,
            } = render(
                <LoginPage
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
            expect(queryByLabelText(/password/i)).toBeInTheDocument();
            expect(queryByText(/refine project/i)).toBeInTheDocument();
            expect(queryByTestId("refine-logo")).toBeInTheDocument();
            expect(
                queryByRole("button", {
                    name: /sign in/i,
                }),
            ).toBeInTheDocument();
            expect(queryByTestId("custom-content")).toBeInTheDocument();
        });
    });
};
