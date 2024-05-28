import React from "react";

import { renderHook } from "@testing-library/react";

import { type ITestWrapperProps, TestWrapper, mockRouterProvider } from "@test";

import { useBreadcrumb } from ".";

const renderWrapper = (wrapperProps: ITestWrapperProps = {}) => {
  const Wrapper = TestWrapper(wrapperProps);

  const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <Wrapper>{children}</Wrapper>;

  return WrapperWith;
};

const DummyResourcePage = () => <div>resource page</div>;
const DummyIcon = <div>icon</div>;

describe("useBreadcrumb Hook", () => {
  it("Should only return `label` without `icon` and `href`", async () => {
    const { result } = renderHook(() => useBreadcrumb(), {
      wrapper: renderWrapper({
        resources: [{ name: "posts" }],
        routerProvider: mockRouterProvider({
          resource: { name: "posts" },
        }),
      }),
    });

    expect(result.current.breadcrumbs).toEqual([{ label: "Posts" }]);
  });

  it("Should return `label` and `icon` without `href`", async () => {
    const { result } = renderHook(() => useBreadcrumb(), {
      wrapper: renderWrapper({
        resources: [
          {
            name: "posts",
            icon: DummyIcon,
          },
        ],
        routerProvider: mockRouterProvider({
          resource: {
            name: "posts",
            icon: DummyIcon,
          },
        }),
      }),
    });

    expect(result.current.breadcrumbs).toEqual([
      { icon: <div>icon</div>, label: "Posts" },
    ]);
  });

  it("if resource has `list` resource page should successfully return `href`", async () => {
    const { result } = renderHook(() => useBreadcrumb(), {
      wrapper: renderWrapper({
        resources: [
          {
            name: "posts",
            route: "posts",
            list: DummyResourcePage,
          },
        ],
        routerProvider: mockRouterProvider({
          resource: {
            name: "posts",
            route: "posts",
            list: DummyResourcePage,
          },
        }),
      }),
    });

    expect(result.current.breadcrumbs).toEqual([
      { label: "Posts", href: "/posts", icon: undefined },
    ]);
  });

  it("if the user is on the resource action page, the action name should be last in the breadcrumbs", async () => {
    const { result } = renderHook(() => useBreadcrumb(), {
      wrapper: renderWrapper({
        resources: [
          {
            name: "posts",
            icon: DummyIcon,
            list: DummyResourcePage,
            create: DummyResourcePage,
          },
        ],
        routerProvider: mockRouterProvider({
          action: "create",
          resource: {
            name: "posts",
            meta: { icon: DummyIcon },
            list: DummyResourcePage,
            create: DummyResourcePage,
          },
        }),
      }),
    });

    expect(result.current.breadcrumbs).toEqual([
      { icon: <div>icon</div>, label: "Posts", href: "/posts" },
      { label: "Create" },
    ]);
  });

  it("if resources has nested resources, `parentName` should come in breadcrumbs", async () => {
    const { result } = renderHook(() => useBreadcrumb(), {
      wrapper: renderWrapper({
        resources: [
          {
            name: "cms",
          },
          {
            meta: { parent: "cms", icon: DummyIcon },
            name: "posts",
            list: DummyResourcePage,
            create: DummyResourcePage,
          },
        ],
        routerProvider: mockRouterProvider({
          action: "create",
          resource: {
            name: "posts",
            meta: { parent: "cms", icon: DummyIcon },
            list: DummyResourcePage,
            create: DummyResourcePage,
          },
        }),
      }),
    });

    expect(result.current.breadcrumbs).toEqual([
      { label: "Cms", href: undefined, icon: undefined },
      { icon: <div>icon</div>, label: "Posts", href: "/posts" },
      { label: "Create" },
    ]);
  });

  it("should return `[]` if resource not found", async () => {
    const { result } = renderHook(() => useBreadcrumb(), {
      wrapper: renderWrapper({
        resources: [],
        routerProvider: mockRouterProvider(),
      }),
    });

    expect(result.current.breadcrumbs).toEqual([]);
  });

  it("should work with i18nProvider", async () => {
    jest.spyOn(console, "warn");

    const { result } = renderHook(() => useBreadcrumb(), {
      wrapper: renderWrapper({
        resources: [{ name: "posts" }],
        routerProvider: mockRouterProvider({
          action: "show",
          resource: { name: "posts" },
        }),
        i18nProvider: {
          translate: (key: string) => key,
          changeLocale: () => Promise.resolve(),
          getLocale: () => "en",
        },
      }),
    });

    expect(console.warn).toBeCalledWith(
      `[useBreadcrumb]: Breadcrumb missing translate key for the "show" action. Please add "actions.show" key to your translation file.\nFor more information, see https://refine.dev/docs/api-reference/core/hooks/useBreadcrumb/#i18n-support`,
    );

    expect(result.current.breadcrumbs).toEqual([
      { label: "posts.posts", href: undefined, icon: undefined },
      { label: "buttons.show" },
    ]);
  });
});
