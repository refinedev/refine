import React, { useState } from "react";

import {
  useForgotPassword,
  useLink,
  useRouterContext,
  useRouterType,
  useTranslate,
} from "@hooks";

import type { DivPropsType, FormPropsType } from "../..";
import type {
  ForgotPasswordFormTypes,
  ForgotPasswordPageProps,
} from "../../types";

type ForgotPasswordProps = ForgotPasswordPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const [email, setEmail] = useState("");

  const { mutate: forgotPassword, isLoading } =
    useForgotPassword<ForgotPasswordFormTypes>();

  const renderLink = (link: string, text?: string) => {
    return <ActiveLink to={link}>{text}</ActiveLink>;
  };

  const content = (
    <div {...contentProps}>
      <h1 style={{ textAlign: "center" }}>
        {translate("pages.forgotPassword.title", "Forgot your password?")}
      </h1>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          forgotPassword({ email });
        }}
        {...formProps}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 25,
          }}
        >
          <label htmlFor="email-input">
            {translate("pages.forgotPassword.fields.email", "Email")}
          </label>
          <input
            id="email-input"
            name="email"
            type="mail"
            autoCorrect="off"
            spellCheck={false}
            autoCapitalize="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="submit"
            disabled={isLoading}
            value={translate(
              "pages.forgotPassword.buttons.submit",
              "Send reset instructions",
            )}
          />
          <br />
          {loginLink ?? (
            <span>
              {translate(
                "pages.register.buttons.haveAccount",
                "Have an account? ",
              )}{" "}
              {renderLink("/login", translate("pages.login.signin", "Sign in"))}
            </span>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
