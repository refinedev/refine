import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

import { useNavigationButton } from ".";
import { useButtonCanAccess } from "../button-can-access";

// Mock the useButtonCanAccess hook
jest.mock("../button-can-access", () => ({
  useButtonCanAccess: jest.fn(),
}));

const mockUseButtonCanAccess = useButtonCanAccess as jest.MockedFunction<
  typeof useButtonCanAccess
>;

const actions = ["list", "show", "create", "edit", "clone"] as const;

describe("useNavigationButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock return value
    mockUseButtonCanAccess.mockReturnValue({
      title: "",
      hidden: false,
      disabled: false,
      canAccess: { can: true },
    });
  });

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

  describe("meta prop passing", () => {
    it("should pass meta prop to useButtonCanAccess", () => {
      const testMeta = {
        customField: "test-value",
        userId: 123,
        permissions: ["read", "write"],
      };

      renderHook(
        () =>
          useNavigationButton({
            action: "show",
            resource: "posts",
            id: 456,
            meta: testMeta,
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      expect(mockUseButtonCanAccess).toHaveBeenCalledWith({
        action: "show",
        accessControl: undefined,
        meta: testMeta,
        id: 456,
        resource: expect.objectContaining({
          name: "posts",
        }),
      });
    });

    it("should pass undefined meta when meta prop is not provided", () => {
      renderHook(
        () =>
          useNavigationButton({
            action: "edit",
            resource: "posts",
            id: 789,
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider({
              resource: { name: "posts" },
            }),
          }),
        },
      );

      expect(mockUseButtonCanAccess).toHaveBeenCalledWith({
        action: "edit",
        accessControl: undefined,
        meta: undefined,
        id: 789,
        resource: expect.objectContaining({
          name: "posts",
        }),
      });
    });

    it("should pass meta prop with accessControl options", () => {
      const testMeta = {
        customAccess: "admin-only",
        department: "engineering",
      };
      const accessControlOptions = {
        enabled: true,
        hideIfUnauthorized: true,
      };

      renderHook(
        () =>
          useNavigationButton({
            action: "create",
            resource: "users",
            meta: testMeta,
            accessControl: accessControlOptions,
          }),
        {
          wrapper: TestWrapper({
            resources: [{ name: "users" }],
            routerProvider: mockRouterProvider({
              resource: { name: "users" },
            }),
          }),
        },
      );

      expect(mockUseButtonCanAccess).toHaveBeenCalledWith({
        action: "create",
        accessControl: accessControlOptions,
        meta: testMeta,
        id: undefined,
        resource: expect.objectContaining({
          name: "users",
        }),
      });
    });

    it("should pass meta prop for all different actions", () => {
      const testMeta = {
        testCase: "all-actions",
        timestamp: Date.now(),
      };

      actions.forEach((action) => {
        jest.clearAllMocks();

        renderHook(
          () =>
            useNavigationButton({
              action,
              resource: "posts",
              id: action === "create" ? undefined : 123,
              meta: testMeta,
            }),
          {
            wrapper: TestWrapper({
              resources: [{ name: "posts" }],
              routerProvider: mockRouterProvider({
                resource: { name: "posts" },
              }),
            }),
          },
        );

        expect(mockUseButtonCanAccess).toHaveBeenCalledWith({
          action,
          accessControl: undefined,
          meta: testMeta,
          id: action === "create" ? undefined : 123,
          resource: expect.objectContaining({
            name: "posts",
          }),
        });
      });
    });
  });
});
