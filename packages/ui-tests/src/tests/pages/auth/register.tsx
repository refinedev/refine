import React, { FC } from "react";

import { render, TestWrapper } from "@test";
import { RegisterPageProps } from "@refinedev/core";

export const pageRegisterTests = function (
    RegisterPage: FC<RegisterPageProps<any, any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Register Page", () => {
        it("should render card title", async () => {
            const { getByText } = render(<RegisterPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByText(/sign up for your account/i)).toBeInTheDocument();
        });

        it("should render card email and password input", async () => {
            const { getByLabelText } = render(<RegisterPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByLabelText(/email/i)).toBeInTheDocument();
            expect(getByLabelText(/password/i)).toBeInTheDocument();
        });

        it("should render providers", async () => {
            const { getByText } = render(
                <RegisterPage
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

        it("should login link", async () => {
            const { getByRole } = render(<RegisterPage />, {
                wrapper: TestWrapper({}),
            });

            expect(
                getByRole("link", {
                    name: /sign in/i,
                }),
            ).toBeInTheDocument();
        });

        it("should not render login link when is false", async () => {
            const { queryByRole } = render(<RegisterPage loginLink={false} />, {
                wrapper: TestWrapper({}),
            });

            expect(
                queryByRole("link", {
                    name: /sign in/i,
                }),
            ).not.toBeInTheDocument();
        });

        it("should render sign up button", async () => {
            const { getByRole } = render(<RegisterPage />, {
                wrapper: TestWrapper({}),
            });

            expect(
                getByRole("button", {
                    name: /sign up/i,
                }),
            ).toBeInTheDocument();
        });

        it("should render default <ThemedTitle> with icon", async () => {
            const { getByText, getByTestId } = render(<RegisterPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByText(/refine project/i)).toBeInTheDocument();
            expect(getByTestId("refine-logo")).toBeInTheDocument();
        });

        it("should render custom title", async () => {
            const { queryByText, queryByTestId } = render(
                <RegisterPage title="Custom Title" />,
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
                <RegisterPage
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
                    name: /sign up/i,
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
                <RegisterPage
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
                    name: /sign up/i,
                }),
            ).toBeInTheDocument();
            expect(queryByTestId("custom-content")).toBeInTheDocument();
        });
    });
};
