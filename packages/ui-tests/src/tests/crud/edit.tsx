import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  type RefineCrudEditProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  render,
  TestWrapper as DefaultTestWrapper,
} from "@test";

const defaultTestWrapperProps: ITestWrapperProps = {
  routerInitialEntries: ["/posts/edit/1"],
};

const renderEdit = (
  edit: React.ReactNode,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
  wrapperProps?: ITestWrapperProps,
) => {
  return render(
    <Routes>
      <Route path="/:resource/edit/:id" element={edit} />
    </Routes>,
    {
      wrapper: TestWrapper({
        ...defaultTestWrapperProps,
        ...wrapperProps,
      }),
    },
  );
};

export const crudEditTests = (
  Edit: React.ComponentType<
    RefineCrudEditProps<any, any, any, any, any, any, any, {}, any, any>
  >,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / CRUD Edit", () => {
    beforeAll(() => {
      jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });

    it("should render children", async () => {
      const { getByText } = renderEdit(<Edit>Something</Edit>, TestWrapper);

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
        TestWrapper,
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
        TestWrapper,
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
        TestWrapper,
      );

      getByText("New Save Button");
      getByText("New Delete Button");
    });

    it("should render default title successfuly", async () => {
      const { getByText } = renderEdit(<Edit />, TestWrapper);

      getByText("Edit Post");
    });

    it("should not render title when is false", async () => {
      const { queryByText } = renderEdit(<Edit title={false} />, TestWrapper);

      const text = queryByText("Edit Post");
      expect(text).not.toBeInTheDocument();
    });

    it("should render custom title successfuly", async () => {
      const { getByText } = renderEdit(
        <Edit title="Custom Title" />,
        TestWrapper,
      );

      getByText("Custom Title");
    });

    it("should render optional recordItemId with resource prop", async () => {
      const { getByText } = renderEdit(<Edit recordItemId="1" />, TestWrapper);

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
        TestWrapper,
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
