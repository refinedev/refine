import React from "react";

import { renderHook } from "@testing-library/react";

import { legacyResourceTransform } from "@definitions/helpers";
import {
  TestWrapper,
  mockLegacyRouterProvider,
  mockRouterProvider,
} from "@test";

import { useMenu } from ".";

describe("useMenu Hook", () => {
  it("should be empty by default", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({}),
    });

    expect(result.current.menuItems).toEqual([]);
  });

  it("should be ignore when list is undefined", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
          },
          {
            name: "CMS",
            key: "CMS",
          },
          {
            name: "Posts",
            parentName: "CMS",
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual([]);
  });

  it("should contain one item with label `Posts`", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            key: "posts",
            label: "Posts",
            list: function list() {
              return <div>render me!</div>;
            },
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ label: "Posts" })]),
    );
  });

  it("should work with i18nProvider", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            key: "posts",
            list: function list() {
              return <div>render me!</div>;
            },
          },
        ],
        i18nProvider: {
          translate: (key) => {
            return `translated ${key}`;
          },
          changeLocale: () => Promise.resolve(),
          getLocale: () => "en",
        },
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "translated posts.posts" }),
      ]),
    );
  });

  it("should have the selectedKey = `posts`", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          resource: {
            name: "posts",
          },
          action: "create",
          pathname: "/posts/create",
        }),
      }),
    });

    expect(result.current.selectedKey).toEqual("/posts");
  });

  it("should have the defaultOpenKeys = [/CMS]", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          pathname: "/CMS/posts",
          resource: {
            name: "posts",
            parentName: "CMS",
            options: {
              route: "asdasd",
            },
          },
        }),
        resources: legacyResourceTransform([
          {
            name: "CMS",
          },
          {
            name: "posts",
            parentName: "CMS",
            options: {
              route: "asdasd",
            },
          },
          {
            name: "categories",
            parentName: "CMS",
          },
          {
            name: "posts",
            parentName: "categories",
            meta: {
              label: "else-new",
              route: "else-new",
            },
            canDelete: true,
          },
        ]),
      }),
    });

    expect(result.current.defaultOpenKeys).toEqual(
      expect.arrayContaining(["/CMS", "/CMS/posts"]),
    );
  });

  it("should have the defaultOpenKeys = [/CMS]", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterProvider({
          pathname: "/CMS/categories/else-new",
          resource: {
            name: "posts",
            parentName: "categories",
            meta: {
              label: "else-new",
              route: "else-new",
            },
            list: () => null,
            canDelete: true,
          },
        }),
        resources: legacyResourceTransform([
          {
            name: "CMS",
          },
          {
            name: "posts",
            parentName: "CMS",
            options: {
              route: "asdasd",
            },
          },
          {
            name: "categories",
            parentName: "CMS",
          },
          {
            name: "posts",
            parentName: "categories",
            meta: {
              label: "else-new",
              route: "else-new",
            },
            list: () => null,
            canDelete: true,
          },
        ]),
      }),
    });

    expect(result.current.defaultOpenKeys).toEqual(
      expect.arrayContaining([
        "/CMS",
        "/CMS/categories",
        "/CMS/categories/posts",
      ]),
    );
  });

  it("should tree view render all except hide true", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: legacyResourceTransform([
          {
            name: "visible",
            list: function list() {
              return <div>render me!</div>;
            },
          },
          {
            name: "hidden",
            meta: {
              hide: true,
            },
          },
          {
            name: "hidden-parent-menu",
            meta: {
              hide: true,
            },
          },
          {
            name: "hidden-child",
            parentName: "hidden-parent-menu",
          },
          {
            name: "CMS",
          },
          {
            name: "Shop-1",
            parentName: "CMS",
            meta: {
              hide: true,
            },
          },
          {
            name: "posts",
            parentName: "Shop-1",
          },
          {
            name: "categories",
            parentName: "Shop-1",
          },
          {
            name: "visible-item-2",
            list: function list() {
              return <div>render me!</div>;
            },
          },
        ]),
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "visible" }),
        expect.objectContaining({ name: "visible-item-2" }),
      ]),
    );

    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "hidden" }),
        expect.objectContaining({ name: "posts" }),
      ]),
    );
  });

  it("should hide all necessary resources with nested structure", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: legacyResourceTransform([
          {
            name: "visible",
            list: function list() {
              return <div>render me!</div>;
            },
          },
          {
            name: "hidden-level-1",
            meta: {
              hide: true,
            },
          },
          {
            name: "hidden-child-level-2",
            parentName: "hidden-parent-menu",
          },
          {
            name: "hidden-parent-level-1",
            meta: {
              hide: true,
            },
          },
          {
            name: "Shop-1",
            parentName: "CMS",
          },
          {
            name: "posts",
            parentName: "Shop-1",
          },
          {
            name: "categories",
            parentName: "Shop-1",
          },
          {
            name: "CMS",
            meta: {
              hide: true,
            },
          },
          {
            name: "visible-item-2",
            list: function list() {
              return <div>render me!</div>;
            },
          },
        ]),
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "visible" }),
        expect.objectContaining({ name: "visible-item-2" }),
      ]),
    );

    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          name: "hidden",
        }),
        expect.objectContaining({
          name: "Shop-1",
        }),
        expect.objectContaining({
          name: "posts",
        }),
        expect.objectContaining({
          name: "categories",
        }),
      ]),
    );
  });

  it("should create `to` property by checking the existing meta and params", () => {
    const { result } = renderHook(
      () =>
        useMenu({
          hideOnMissingParameter: true,
          meta: { repoId: "2" },
        }),
      {
        wrapper: TestWrapper({
          routerProvider: mockRouterProvider({
            params: {
              orgId: "1",
            },
          }),
          resources: legacyResourceTransform([
            {
              name: "projects",
              list: ":orgId/repos/:repoId/projects",
            },
          ]),
        }),
      },
    );

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "projects",
          route: "/1/repos/2/projects",
        }),
      ]),
    );
  });

  it("should hide item if parameter is missing by default", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: legacyResourceTransform([
          {
            name: "visible",
            list: () => null,
          },
          {
            name: "org-users",
            list: "orgs/:orgId/users",
          },
        ]),
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });

  it("should hide item if parameter is missing by partial props", async () => {
    const { result } = renderHook(() => useMenu({ meta: {} }), {
      wrapper: TestWrapper({
        resources: legacyResourceTransform([
          {
            name: "visible",
            list: () => null,
          },
          {
            name: "org-users",
            list: "orgs/:orgId/users",
          },
        ]),
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });

  it("should hide item if parameter is missing if set explicitly", async () => {
    const { result } = renderHook(
      () => useMenu({ hideOnMissingParameter: true }),
      {
        wrapper: TestWrapper({
          resources: legacyResourceTransform([
            {
              name: "visible",
              list: () => null,
            },
            {
              name: "org-users",
              list: "orgs/:orgId/users",
            },
          ]),
        }),
      },
    );

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });

  it("should hide item if parameter is missing", async () => {
    const { result } = renderHook(
      () => useMenu({ hideOnMissingParameter: true }),
      {
        wrapper: TestWrapper({
          resources: legacyResourceTransform([
            {
              name: "visible",
              list: () => null,
            },
            {
              name: "org-users",
              list: "orgs/:orgId/users",
            },
          ]),
        }),
      },
    );

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "visible" })]),
    );
    expect(result.current.menuItems).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ name: "org-users" }),
      ]),
    );
  });

  // NOTE: Will be removed in the refine v5
  it("should work with deprecated props", async () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            list: "/posts",
            options: {
              icon: "X",
              label: "Best Posts",
            },
          },
          {
            name: "categories",
            list: "/categories",
            options: {
              hide: true,
            },
          },
        ],
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "posts",
          icon: "X",
          label: "Best Posts",
          options: { icon: "X", label: "Best Posts" },
        }),
        expect.not.objectContaining({ name: "categories" }),
      ]),
    );
  });
});

// NOTE: Will be removed in the refine v5
describe("legacy roter provider", () => {
  it("should contain resources", () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            list: () => null,
          },
        ],
        legacyRouterProvider: {
          ...mockLegacyRouterProvider(),
          useLocation: () => ({
            pathname: "/posts",
            search: "",
          }),
        },
      }),
    });

    expect(result.current.menuItems).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "posts" })]),
    );
  });
});
