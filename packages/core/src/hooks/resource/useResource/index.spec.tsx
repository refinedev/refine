import React from "react";

import { renderHook } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  mockLegacyRouterProvider,
  mockRouterProvider,
} from "@test";

import { useResource } from "./";

describe("useResource Hook", () => {
  it("returns context value", async () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    expect(result.current.resources).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "posts" })]),
    );
  });

  it("should successfully return meta value", async () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [
          {
            name: "posts",
            meta: {
              isThatReallyWork: true,
            },
          },
        ],
      }),
    });

    expect(result.current.resources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "posts",
          meta: {
            isThatReallyWork: true,
          },
        }),
      ]),
    );
  });
});

describe("useResource Hook without prop", () => {
  const Wrapper = TestWrapper({
    routerProvider: mockRouterProvider({
      pathname: "/posts/edit/1",
      resource: {
        name: "posts",
      },
      action: "edit",
      id: "1",
    }),
  });

  const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <Wrapper>{children}</Wrapper>;

  it("should return posts as resourceName cause of inital resource", async () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: WrapperWith,
    });

    expect(result.current.resourceName).toBe("posts");
    expect(result.current.action).toBe("edit");
  });

  it("should return resource which route is custom route", async () => {
    const Wrapper = TestWrapper({
      resources: [
        {
          name: "posts",
          meta: { route: "custom-route-posts" },
        },
      ],
      routerProvider: mockRouterProvider({
        pathname: "/custom-route-posts",
        resource: {
          name: "posts",
          meta: { route: "custom-route-posts" },
        },
        action: "list",
      }),
    });

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => <Wrapper>{children}</Wrapper>;
    const { result } = renderHook(() => useResource(), {
      wrapper: WrapperWith,
    });

    expect(result.current.resource?.meta?.route).toBe("custom-route-posts");

    expect(result.current.action).toBe("list");
  });

  it("should return resource which route is custom route and with identifier", async () => {
    const { result } = renderHook(() => useResource("posts"), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          action: "list",
        }),
      }),
    });

    expect(result.current.action).toBe("list");
    expect(result.current.resource).toEqual({ name: "posts" });
  });
});

describe("useResource Hook with resourceName:propResourceName prop", () => {
  it("should return propResourceName as resourceName", async () => {
    const Wrapper = TestWrapper({
      routerProvider: mockRouterProvider({
        pathname: "/posts",
        resource: {
          name: "posts",
        },
        action: "list",
      }),
    });

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => <Wrapper>{children}</Wrapper>;
    const { result } = renderHook(
      () => useResource({ resourceName: "categories" }),
      {
        wrapper: WrapperWith,
      },
    );

    expect(result.current.action).toBe("list");
  });
});

describe("useResource Hook with resourceNameOrRouteName prop", () => {
  it("should return propResourceName as resourceName", async () => {
    const Wrapper = TestWrapper({
      resources: [{ name: "refine-makes" }],
      routerProvider: mockRouterProvider({
        pathname: "/refine-makes",
        resource: {
          name: "refine-makes",
        },
        action: "list",
      }),
    });

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => <Wrapper>{children}</Wrapper>;
    const { result } = renderHook(
      () => useResource({ resourceNameOrRouteName: "refine-makes" }),
      {
        wrapper: WrapperWith,
      },
    );

    expect(result.current.resource?.name).toBe("refine-makes");
    expect(result.current.action).toBe("list");
  });
});

// NOTE: Will be removed in the refine v5
describe("legacy router provider", () => {
  it("should use `resource` from `resourceNameOrRouteName` prop", async () => {
    const { result } = renderHook(
      () =>
        useResource({
          resourceNameOrRouteName: "resourceNameOrRouteName",
        }),
      {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
          legacyRouterProvider: {
            ...mockLegacyRouterProvider(),
            useParams: () =>
              ({
                resource: "posts",
                action: "list",
              }) as any,
          },
        }),
      },
    );

    expect(result.current.resource?.name).toBe("resourceNameOrRouteName");
    expect(result.current.action).toBe("list");
  });

  it("should use `resource` from `useParams`", async () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        legacyRouterProvider: {
          ...mockLegacyRouterProvider(),
          useParams: () =>
            ({
              resource: "posts",
              action: "show",
              id: "1",
            }) as any,
        },
      }),
    });

    expect(result.current.resource?.name).toBe("posts");
    expect(result.current.action).toBe("show");
    expect(result.current.id).toBe("1");
  });

  it("should work without `resourceName` and `recordItemId`", async () => {
    const { result } = renderHook(
      () => useResource({ resourceName: "posts", recordItemId: "1" }),
      {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
          legacyRouterProvider: {
            ...mockLegacyRouterProvider(),
          },
        }),
      },
    );

    expect(result.current.resourceName).toBe("posts");
    expect(result.current.id).toBe("1");
  });

  describe("when router type is legacy", () => {
    describe("test `select` method", () => {
      it("should return dummy resource, if resource not found", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            legacyRouterProvider: mockLegacyRouterProvider(),
          }),
        });

        const { resource, identifier } = result.current.select("categories");

        expect(resource).toStrictEqual({
          name: "categories",
          identifier: "categories",
        });
        expect(identifier).toBe("categories");
      });

      it("should return undefined when force is false and resource not found", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            legacyRouterProvider: mockLegacyRouterProvider(),
          }),
        });

        const selectResult = result.current.select("categories", false);

        expect(selectResult?.resource).toBeUndefined();
        expect(selectResult?.identifier).toBeUndefined();
      });

      it("should return matched resource, if resource is found", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [
              {
                name: "posts",
                identifier: "featured-posts",
                meta: { label: "Posts" },
              },
            ],
            legacyRouterProvider: mockLegacyRouterProvider(),
          }),
        });

        const selectResult = result.current.select("posts", false);

        expect(selectResult?.resource).toStrictEqual({
          canCreate: false,
          canDelete: undefined,
          canEdit: false,
          canShow: false,
          identifier: "featured-posts",
          label: "Posts",
          name: "posts",
          meta: {
            label: "Posts",
          },
          options: { route: undefined },
          route: "/posts",
        });
        expect(selectResult?.identifier).toBe("featured-posts");
      });
    });

    describe("test `identifier` property", () => {
      it("should be undefined, if not matched any resource", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            legacyRouterProvider: mockLegacyRouterProvider(),
          }),
        });

        expect(result.current.identifier).toBeUndefined();
      });

      it("should be matched resource name, if `identifier` is not defined", async () => {
        const { result } = renderHook(() => useResource("posts"), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            legacyRouterProvider: mockLegacyRouterProvider(),
          }),
        });

        expect(result.current.identifier).toBe("posts");
      });

      it("should be matched resource `identifier`, if matched resource has `identifier`", async () => {
        const { result } = renderHook(() => useResource("awesome-posts"), {
          wrapper: TestWrapper({
            resources: [
              { name: "posts" },
              { name: "posts", identifier: "awesome-posts" },
            ],
            legacyRouterProvider: mockLegacyRouterProvider(),
          }),
        });

        expect(result.current.identifier).toBe("awesome-posts");
      });
    });
  });

  describe("when router type is new", () => {
    describe("test `select` method", () => {
      it("should return dummy resource, if resource not found", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider(),
          }),
        });

        const { resource, identifier } = result.current.select("categories");

        expect(resource).toStrictEqual({
          name: "categories",
          identifier: "categories",
        });
        expect(identifier).toBe("categories");
      });

      it("should return undefined when force is false and if resource not found", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider(),
          }),
        });

        const selectResult = result.current.select("categories", false);

        expect(selectResult?.resource).toBeUndefined();
        expect(selectResult?.identifier).toBeUndefined();
      });

      it("should return matched resource, if resource is found", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [
              {
                name: "posts",
                identifier: "featured-posts",
                meta: { label: "Featured Posts" },
              },
            ],
            routerProvider: mockRouterProvider(),
          }),
        });

        const selectResult = result.current.select("posts", false);

        expect(selectResult?.resource).toStrictEqual({
          canCreate: false,
          canDelete: undefined,
          canEdit: false,
          canShow: false,
          identifier: "featured-posts",
          label: "Featured Posts",
          name: "posts",
          meta: {
            label: "Featured Posts",
          },
          options: { route: undefined },
          route: "/posts",
        });
        expect(selectResult?.identifier).toBe("featured-posts");
      });
    });

    describe("test `identifier` property", () => {
      it("should be undefined, if not matched any resource", async () => {
        const { result } = renderHook(() => useResource(), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider(),
          }),
        });

        expect(result.current.identifier).toBeUndefined();
      });

      it("should be matched resource name, if `identifier` is not defined", async () => {
        const { result } = renderHook(() => useResource("posts"), {
          wrapper: TestWrapper({
            resources: [{ name: "posts" }],
            routerProvider: mockRouterProvider(),
          }),
        });

        expect(result.current.identifier).toBe("posts");
      });

      it("should be matched resource `identifier`, if matched resource has `identifier`", async () => {
        const { result } = renderHook(() => useResource("awesome-posts"), {
          wrapper: TestWrapper({
            resources: [
              { name: "posts" },
              { name: "posts", identifier: "awesome-posts" },
            ],
            routerProvider: mockRouterProvider(),
          }),
        });

        expect(result.current.identifier).toBe("awesome-posts");
      });
    });
  });
});
