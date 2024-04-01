import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

import { useNavigationButton } from ".";

const actions = ["list", "show", "create", "edit", "clone"] as const;

describe("useNavigationButton", () => {
  describe.each(actions)("with action %s", (action) => {
    it("should return 'to' empty string if no route is defined", () => {
      const { result } = renderHook(
        () => useNavigationButton({ action, resource: "posts", id: 123 }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      expect(result.current.to).toEqual("");
    });

    it("should return 'to' correctly by resource", async () => {
      const resource = {
        name: "posts",
        list: "/posts",
        show: "/posts/:id",
        edit: "/posts/:id/edit",
        create: "/posts/create",
        clone: "/posts/:id/clone",
      };

      const goMock = jest.fn();

      renderHook(
        () => useNavigationButton({ action, resource: "posts", id: 123 }),
        {
          wrapper: TestWrapper({
            resources: [resource],
            routerProvider: {
              ...mockRouterProvider({
                resource: resource,
              }),
              go: () => goMock,
            },
          }),
        },
      );

      expect(goMock).toBeCalledWith({
        to: resource[action].replace(":id", "123"),
        type: "path",
      });
    });

    it("should return correct 'label' by action", () => {
      const { result } = renderHook(
        () => useNavigationButton({ action, resource: "posts", id: 123 }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      const labels = {
        list: "Posts",
        show: "Show",
        create: "Create",
        edit: "Edit",
        clone: "Clone",
      };

      expect(result.current.label).toEqual(labels[action]);
    });

    if (!["list", "create"].includes(action)) {
      it("should return 'to' empty if id not provided and resource is different from the inferred", async () => {
        const resources = [
          {
            name: "posts",
            list: "/posts",
            show: "/posts/:id",
            edit: "/posts/:id/edit",
            create: "/posts/create",
            clone: "/posts/:id/clone",
          },
          {
            name: "comments",
            list: "/comments",
            show: "/comments/:id",
            edit: "/comments/:id/edit",
            create: "/comments/create",
            clone: "/comments/:id/clone",
          },
        ];

        const goMock = jest.fn();

        renderHook(
          () => useNavigationButton({ action, resource: "comments" }),
          {
            wrapper: TestWrapper({
              resources: resources,
              routerProvider: {
                ...mockRouterProvider({
                  resource: resources[0],
                }),
                go: () => goMock,
              },
            }),
          },
        );

        expect(goMock).not.toBeCalled();
      });
    }
  });
});
