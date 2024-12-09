import React from "react";
import { Route, Routes } from "react-router";
import {
  type RefineCrudEditProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import type { AccessControlProvider } from "@refinedev/core";

import { type ITestWrapperProps, render, TestWrapper } from "@test";

const renderEdit = (
  edit: React.ReactNode,
  accessControlProvider?: AccessControlProvider,
  wrapperProps?: ITestWrapperProps,
) => {
  return render(
    <Routes>
      <Route path="/:resource/edit/:id" element={edit} />
    </Routes>,
    {
      wrapper: TestWrapper(
        wrapperProps
          ? wrapperProps
          : {
              routerInitialEntries: ["/posts/edit/1"],
              accessControlProvider,
            },
      ),
    },
  );
};

export const crudEditTests = (
  Edit: React.ComponentType<
    RefineCrudEditProps<any, any, any, any, any, any, any, {}, any, any>
  >,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / CRUD Edit", () => {
    beforeAll(() => {
      jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });

    it("should render children", async () => {
      const { getByText } = renderEdit(<Edit>Something</Edit>);

      getByText("Something");
    });

    it("should render default list button successfuly", async () => {
      const { queryByTestId } = renderEdit(
        <Edit
          headerButtons={({ defaultButtons, listButtonProps }) => {
            expect(listButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
      );

      expect(queryByTestId(RefineButtonTestIds.ListButton)).not.toBeNull();
    });

    it("should render default save and delete buttons successfuly", async () => {
      const { container, getByText } = renderEdit(
        <Edit
          canDelete
          footerButtons={({
            defaultButtons,
            saveButtonProps,
            deleteButtonProps,
          }) => {
            expect(saveButtonProps).toBeDefined();
            expect(deleteButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
      );

      expect(container.querySelector("button")).toBeTruthy();
      getByText("Save");
      getByText("Delete");
    });

    it("should render optional buttons with actionButtons prop", async () => {
      const { getByText } = renderEdit(
        <Edit
          footerButtons={
            <>
              <button>New Save Button</button>
              <button>New Delete Button</button>
            </>
          }
        />,
      );

      getByText("New Save Button");
      getByText("New Delete Button");
    });

    it("should render default title successfuly", async () => {
      const { getByText } = renderEdit(<Edit />);

      getByText("Edit Post");
    });

    it("should not render title when is false", async () => {
      const { queryByText } = renderEdit(<Edit title={false} />);

      const text = queryByText("Edit Post");
      expect(text).not.toBeInTheDocument();
    });

    it("should render custom title successfuly", async () => {
      const { getByText } = renderEdit(<Edit title="Custom Title" />);

      getByText("Custom Title");
    });

    it("should render optional recordItemId with resource prop", async () => {
      const { getByText } = renderEdit(<Edit recordItemId="1" />);

      getByText("Edit Post");
    });

    it("should render delete button ", async () => {
      const { getByText, queryByTestId } = renderEdit(
        <Edit
          footerButtons={({ defaultButtons, deleteButtonProps }) => {
            expect(deleteButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        undefined,
        {
          resources: [{ name: "posts", canDelete: true }],
          routerInitialEntries: ["/posts/edit/1"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();

      getByText("Edit Post");
    });
  });
};
