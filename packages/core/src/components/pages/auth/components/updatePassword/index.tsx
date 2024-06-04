import React, { useState } from "react";

import { useActiveAuthProvider } from "@definitions/helpers";
import { useTranslate, useUpdatePassword } from "@hooks";

import type { DivPropsType, FormPropsType } from "../..";
import type {
  UpdatePasswordFormTypes,
  UpdatePasswordPageProps,
} from "../../types";

type UpdatePasswordProps = UpdatePasswordPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: updatePassword, isLoading } =
    useUpdatePassword<UpdatePasswordFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const content = (
    <div {...contentProps}>
      <h1 style={{ textAlign: "center" }}>
        {translate("pages.updatePassword.title", "Update Password")}
      </h1>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePassword({
            password: newPassword,
            confirmPassword,
          });
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
          <label htmlFor="password-input">
            {translate("pages.updatePassword.fields.password", "New Password")}
          </label>
          <input
            id="password-input"
            name="password"
            type="password"
            required
            size={20}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="confirm-password-input">
            {translate(
              "pages.updatePassword.fields.confirmPassword",
              "Confirm New Password",
            )}
          </label>
          <input
            id="confirm-password-input"
            name="confirmPassword"
            type="password"
            required
            size={20}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="submit"
            disabled={isLoading}
            value={translate("pages.updatePassword.buttons.submit", "Update")}
          />
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
