import React, { type FC } from "react";

import {
  fireEvent,
  mockAuthProvider,
  mockLegacyAuthProvider,
  render,
  TestWrapper,
  waitFor,
} from "@test";
import type { UpdatePasswordPageProps } from "@refinedev/core";

export const pageUpdatePasswordTests = (
  UpdatePasswordPage: FC<UpdatePasswordPageProps<any, any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Update Password Page", () => {
    it("should render card title", async () => {
      const { getByText } = render(<UpdatePasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByText(/set new password?/i)).toBeInTheDocument();
    });

    it("should render password input", async () => {
      const { getByLabelText } = render(<UpdatePasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByLabelText("New Password")).toBeInTheDocument();
      expect(getByLabelText("Confirm New Password")).toBeInTheDocument();
    });

    it("should render default <ThemedTitle> with icon", async () => {
      const { getByText, getByTestId } = render(<UpdatePasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByText(/refine project/i)).toBeInTheDocument();
      expect(getByTestId("refine-logo")).toBeInTheDocument();
    });

    it("should render custom title", async () => {
      const { queryByText, queryByTestId } = render(
        <UpdatePasswordPage title="Custom Title" />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByText(/custom title/i)).toBeInTheDocument();
      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
      expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
    });

    it("should renderContent only", async () => {
      const { queryByText, queryByTestId, queryByLabelText } = render(
        <UpdatePasswordPage
          renderContent={() => <div data-testid="custom-content" />}
        />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
      expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
      expect(queryByLabelText("New Password")).not.toBeInTheDocument();
      expect(queryByLabelText("Confirm New Password")).not.toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
    });

    it("should not render title when is false", async () => {
      const { queryByText } = render(<UpdatePasswordPage title={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
    });

    it("should pass contentProps", async () => {
      const { getByTestId } = render(
        <UpdatePasswordPage contentProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });

    it("should pass wrapperProps", async () => {
      const { getByTestId } = render(
        <UpdatePasswordPage wrapperProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });

    it("should customizable with renderContent", async () => {
      const { queryByText, queryByTestId, getByLabelText } = render(
        <UpdatePasswordPage
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
      expect(queryByText(/refine project/i)).toBeInTheDocument();
      expect(queryByTestId("refine-logo")).toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
      expect(getByLabelText("New Password")).toBeInTheDocument();
      expect(getByLabelText("Confirm New Password")).toBeInTheDocument();
    });

    it("should run updatePassword mutation when form is submitted", async () => {
      const updatePasswordMock = jest.fn().mockResolvedValue({ success: true });
      const { getAllByLabelText, getByLabelText, getAllByText } = render(
        <UpdatePasswordPage />,
        {
          wrapper: TestWrapper({
            authProvider: {
              ...mockAuthProvider,
              updatePassword: updatePasswordMock,
            },
          }),
        },
      );

      fireEvent.change(getAllByLabelText(/password/i)[0], {
        target: { value: "demo" },
      });

      fireEvent.change(getByLabelText(/confirm new password/i), {
        target: { value: "demo" },
      });

      fireEvent.click(getAllByText(/update/i)[0]);

      await waitFor(() => {
        expect(updatePasswordMock).toBeCalledTimes(1);
      });

      expect(updatePasswordMock).toBeCalledWith({
        password: "demo",
        confirmPassword: "demo",
      });
    });

    it("should run updatePassword mutation when form is submitted with legacy authProvider", async () => {
      const updatePasswordMock = jest.fn().mockResolvedValue({ success: true });
      const { getAllByLabelText, getByLabelText, getAllByText } = render(
        <UpdatePasswordPage />,
        {
          wrapper: TestWrapper({
            legacyAuthProvider: {
              ...mockLegacyAuthProvider,
              updatePassword: updatePasswordMock,
            },
          }),
        },
      );

      fireEvent.change(getAllByLabelText(/password/i)[0], {
        target: { value: "demo" },
      });

      fireEvent.change(getByLabelText(/confirm new password/i), {
        target: { value: "demo" },
      });

      fireEvent.click(getAllByText(/update/i)[0]);

      await waitFor(() => {
        expect(updatePasswordMock).toBeCalledTimes(1);
      });

      expect(updatePasswordMock).toBeCalledWith({
        password: "demo",
        confirmPassword: "demo",
      });
    });

    it("if passwords are not matched, should display the validation error", async () => {
      const { getAllByLabelText, getByLabelText, getByText } = render(
        <UpdatePasswordPage />,
        {
          wrapper: TestWrapper({
            authProvider: mockAuthProvider,
          }),
        },
      );

      fireEvent.change(getAllByLabelText(/password/i)[0], {
        target: { value: "demo" },
      });

      fireEvent.change(getByLabelText(/confirm new password/i), {
        target: { value: "demo2" },
      });

      fireEvent.click(getByText(/update/i));

      await waitFor(() => {
        expect(getByText(/asswords do not match/i)).toBeInTheDocument();
      });
    });

    it("should should accept 'mutationVariables'", async () => {
      const updatePasswordMock = jest.fn().mockResolvedValue({ success: true });

      const { getByRole, getByLabelText, getAllByLabelText } = render(
        <UpdatePasswordPage
          mutationVariables={{
            foo: "bar",
            xyz: "abc",
          }}
        />,
        {
          wrapper: TestWrapper({
            authProvider: {
              ...mockAuthProvider,
              updatePassword: updatePasswordMock,
            },
          }),
        },
      );

      fireEvent.change(getAllByLabelText(/password/i)[0], {
        target: { value: "demo" },
      });

      fireEvent.change(getByLabelText(/confirm new password/i), {
        target: { value: "demo" },
      });

      fireEvent.click(
        getByRole("button", {
          name: /update/i,
        }),
      );

      await waitFor(
        () => {
          expect(updatePasswordMock).toHaveBeenCalledWith({
            foo: "bar",
            xyz: "abc",
            password: "demo",
            confirmPassword: "demo",
          });
        },
        { timeout: 500 },
      );
    });
  });
};
