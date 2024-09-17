import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  type RefineCrudListProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  render,
  TestWrapper as DefaultTestWrapper,
  waitFor,
} from "@test";

const defaultTestWrapperProps: ITestWrapperProps = {
  routerInitialEntries: ["/posts"],
};

const renderList = (
  list: React.ReactNode,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
  wrapperProps?: ITestWrapperProps,
) => {
  return render(
    <Routes>
      <Route path="/:resource" element={list} />
    </Routes>,
    {
      wrapper: TestWrapper({
        ...defaultTestWrapperProps,
        ...wrapperProps,
      }),
    },
  );
};

export const crudListTests = (
  List: React.ComponentType<RefineCrudListProps<any, any, any, any, any, {}>>,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / CRUD List", () => {
    beforeAll(() => {
      jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });

    it("should render children", async () => {
      const { getByText } = renderList(
        <List key="posts">
          <div>No Data</div>
        </List>,
        TestWrapper,
      );

      getByText("No Data");
    });

    it("should render optional title with title prop", async () => {
      const { getByText } = renderList(<List title="New Title" />, TestWrapper);

      getByText("New Title");
    });

    it("should not render title when is false", async () => {
      const { queryByText } = renderList(<List title={false} />, TestWrapper, {
        resources: [
          {
            name: "posts",
            meta: { route: "posts" },
          },
        ],
        routerInitialEntries: ["/posts"],
      });

      const text = queryByText("Posts");
      expect(text).not.toBeInTheDocument();
    });

    it("should render with label instead of resource name successfully", async () => {
      const { getByText } = renderList(<List />, TestWrapper, {
        resources: [
          {
            name: "posts",
            meta: { route: "posts", label: "test" },
          },
        ],
        routerInitialEntries: ["/posts"],
      });

      getByText("Tests");
    });

    it("should render create button", async () => {
      const { queryByTestId } = renderList(
        <List
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        TestWrapper,
        {
          resources: [
            {
              name: "posts",
              create: () => null,
            },
          ],
          routerInitialEntries: ["/posts"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).not.toBeNull();
    });

    it("should not render create button on resource#canCreate=false", async () => {
      const { queryByTestId } = renderList(
        <List
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).not.toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        TestWrapper,
        {
          resources: [
            {
              name: "posts",
              canCreate: false,
            },
          ],
          routerInitialEntries: ["/posts"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeNull();
    });

    it("should render create button on resource#canCreate=false & props#createButtonProps!=null", async () => {
      const { getByText, queryByTestId } = renderList(
        <List
          createButtonProps={{ "aria-label": "Create Button" }}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        TestWrapper,
        { routerInitialEntries: ["/posts"] },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).not.toBeNull();

      getByText("Posts");
    });

    it("should not render create button on resource#canCreate=true & props#canCreate=false", async () => {
      const { queryByTestId } = renderList(
        <List
          canCreate={false}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeUndefined();
            return <>{defaultButtons}</>;
          }}
        />,
        TestWrapper,
        {
          resources: [
            {
              name: "posts",
              create: () => null,
            },
          ],
          routerInitialEntries: ["/posts"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeNull();
    });

    it("should render create button on resource#canCreate=false & props#canCreate=true", async () => {
      const { queryByTestId } = renderList(
        <List
          canCreate={true}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        TestWrapper,
        {
          resources: [
            {
              name: "posts",
            },
          ],
          routerInitialEntries: ["/posts"],
        },
      );

      expect(queryByTestId(RefineButtonTestIds.CreateButton)).not.toBeNull();
    });

    it("should render disabled create button if user doesn't have permission", async () => {
      const { queryByTestId } = renderList(
        <List
          canCreate={true}
          headerButtons={({ defaultButtons, createButtonProps }) => {
            expect(createButtonProps).toBeDefined();
            return <>{defaultButtons}</>;
          }}
        />,
        TestWrapper,
        {
          accessControlProvider: {
            can: ({ action }) => {
              switch (action) {
                case "create":
                  return Promise.resolve({ can: false });
                default:
                  return Promise.resolve({ can: false });
              }
            },
          },
        },
      );

      await waitFor(() =>
        expect(queryByTestId(RefineButtonTestIds.CreateButton)).toBeDisabled(),
      );
    });
  });
};
