import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  type RefineCrudShowProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  render,
  TestWrapper as DefaultTestWrapper,
} from "@test";

const defaultTestWrapperProps = {
  routerInitialEntries: ["/posts/show/1"],
};

const renderShow = (
  show: React.ReactNode,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
  wrapperProps?: ITestWrapperProps,
) => {
  return render(
    <Routes>
      <Route path="/:resource/:action/:id" element={show} />
    </Routes>,
    {
      wrapper: TestWrapper(
        wrapperProps ? wrapperProps : defaultTestWrapperProps,
      ),
    },
  );
};

export const crudShowTests = (
  Show: React.ComponentType<
    RefineCrudShowProps<any, any, any, any, any, {}, any, any, any, any>
  >,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / CRUD Show", () => {
    beforeAll(() => {
      jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });

    it("should render children", async () => {
      const { getByText } = renderShow(<Show>Something</Show>, TestWrapper);

      getByText("Something");
    });

    it("should render default edit and delete buttons successfuly", async () => {
      const { queryByTestId } = renderShow(
        <Show
          canEdit
          canDelete
          headerButtons={({
            defaultButtons,
            editButtonProps,
            deleteButtonProps,
          }) => {
            expect(editButtonProps).toBeDefined();
            expect(deleteButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        TestWrapper,
      );

      expect(queryByTestId(RefineButtonTestIds.EditButton)).not.toBeNull();
      expect(queryByTestId(RefineButtonTestIds.DeleteButton)).not.toBeNull();
    });

    it("should render optional buttons with actionButtons prop", async () => {
      const { findByText } = renderShow(
        <Show
          headerButtons={
            <>
              <button>New Save Button</button>
              <button>New Delete Button</button>
            </>
          }
        />,
        TestWrapper,
      );

      await findByText("New Save Button");
      await findByText("New Delete Button");
    });

    it("should render default title successfuly", async () => {
      const { getByText } = renderShow(<Show />, TestWrapper);

      getByText("Show Post");
    });

    it("should not render title when is false", async () => {
      const { queryByText } = renderShow(<Show title={false} />, TestWrapper);

      const text = queryByText("Show Post");
      expect(text).not.toBeInTheDocument();
    });

    it("should render optional title with title prop", async () => {
      const { getByText } = renderShow(
        <Show title="Test Title" />,
        TestWrapper,
      );

      getByText("Test Title");
    });

    it("should render optional resource with resource prop", async () => {
      const { getByText, container } = render(
        <Routes>
          <Route path="/:resource" element={<Show resource="posts" />} />
        </Routes>,
        {
          wrapper: TestWrapper({
            routerInitialEntries: ["/custom"],
          }),
        },
      );

      getByText("Show Post");
    });
  });
};
