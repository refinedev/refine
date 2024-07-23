import React from "react";

import { renderHook, waitFor } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  act,
  mockLegacyRouterProvider,
  mockRouterProvider,
} from "@test";
import { posts } from "@test/dataMocks";

import type { IResourceItem } from "../../contexts/resource/types";
import * as pickResource from "../../definitions/helpers/pick-resource";
import * as useResourceWithRoute from "../resource/useResourceWithRoute";

import { useShow } from "./index";

const routerProvider = mockRouterProvider({
  action: "show",
  resource: { name: "posts" },
  id: "1",
  pathname: "/posts/show/1",
});

const Wrapper = TestWrapper({
  dataProvider: MockJSONServer,
  resources: [{ name: "posts" }],
  routerProvider: routerProvider,
});

const WrapperWithRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Wrapper>{children}</Wrapper>;
describe("useShow Hook", () => {
  it("should fetch data with use-query params succesfully", async () => {
    const { result } = renderHook(() => useShow(), {
      wrapper: WrapperWithRoute,
    });

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(result.current.queryResult.data?.data.id).toEqual(posts[0].id);
  });

  it("should fetch data with hook params succesfully", async () => {
    const { result } = renderHook(
      () => useShow({ resource: "posts", id: "1" }),
      {
        wrapper: WrapperWithRoute,
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(result.current.queryResult.data?.data.id).toEqual(posts[0].id);
    expect(result.current.showId).toEqual("1");
  });

  it("correctly return id value from options", async () => {
    const { result } = renderHook(
      () =>
        useShow({
          resource: "categories",
          id: "2",
        }),
      {
        wrapper: WrapperWithRoute,
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(result.current.showId).toEqual("2");
  });

  it("correctly return id value from route", async () => {
    const { result } = renderHook(() => useShow(), {
      wrapper: WrapperWithRoute,
    });

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(result.current.showId).toEqual("1");
  });

  it("correctly return id undefined when route and options is different", async () => {
    const { result } = renderHook(
      () =>
        useShow({
          resource: "categories",
        }),
      {
        wrapper: WrapperWithRoute,
      },
    );

    expect(result.current.showId).toEqual(undefined);
  });

  it("correctly return id undefined when resource different from route", async () => {
    const { result } = renderHook(
      () =>
        useShow({
          resource: "categories",
        }),
      {
        wrapper: WrapperWithRoute,
      },
    );

    expect(result.current.showId).toEqual(undefined);
  });

  it("correctly return id when resource different from route", async () => {
    const { result } = renderHook(
      () =>
        useShow({
          resource: "categories",
          id: "2",
        }),
      {
        wrapper: WrapperWithRoute,
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(result.current.showId).toEqual("2");
  });

  it("correctly return id value which was set with setShowId after it was set", async () => {
    const { result } = renderHook(() => useShow(), {
      wrapper: WrapperWithRoute,
    });

    expect(result.current.showId).toEqual("1");

    await act(async () => {
      result.current.setShowId("3");
    });

    expect(result.current.showId).toEqual("3");
  });

  it("correctly return id value after its updated with a new value", async () => {
    const { result, rerender } = renderHook(({ id }) => useShow({ id }), {
      wrapper: WrapperWithRoute,
      initialProps: { id: "1" },
    });

    await waitFor(() => expect(result.current.showId).toEqual("1"));

    await act(async () => {
      rerender({ id: "2" });
    });

    await waitFor(() => expect(result.current.showId).toEqual("2"));
  });

  it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
    const getOneMock = jest.fn();

    renderHook(() => useShow({ resource: "posts", meta: { foo: "bar" } }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getOne: getOneMock,
          },
        },
        routerProvider: mockRouterProvider({
          action: "show",
          resource: { name: "posts" },
          id: "1",
          pathname: "/posts/show/1",
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    await waitFor(() => {
      expect(getOneMock).toBeCalled();
    });

    expect(getOneMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
          dip: "dop",
        }),
      }),
    );
  });

  it("two resources with same name, should pass resource meta according to identifier", async () => {
    const getOneMock = jest.fn();

    renderHook(() => useShow({ resource: "recentPosts", id: "1" }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getOne: getOneMock,
          },
        },
        routerProvider: mockRouterProvider({
          action: "show",
          resource: { name: "posts" },
          id: "1",
          pathname: "/posts/show/1",
        }),
        resources: [
          {
            name: "posts",
            identifier: "recentPosts",
            meta: {
              startDate: "2021-01-01",
            },
          },
          {
            name: "posts",
            identifier: "popularPosts",
            meta: {
              likes: 100,
            },
          },
        ],
      }),
    });

    await waitFor(() => {
      expect(getOneMock).toBeCalled();
    });

    expect(getOneMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          startDate: "2021-01-01",
        }),
      }),
    );

    expect(getOneMock).not.toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          likes: 100,
        }),
      }),
    );
  });

  it.each(["resourceFromRouter", "resourceFromProp"] as const)(
    "should work with both %s with legacy router provider",
    async (testCase) => {
      const isFromProp = testCase === "resourceFromProp";

      const { result } = renderHook(
        () => useShow(isFromProp ? { resource: "posts", id: "1" } : {}),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
              },
            },
            resources: [{ name: "posts" }],
            routerProvider,
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.queryResult.isSuccess).toBeTruthy();
        expect(result.current.queryResult.data?.data).toEqual(posts[0]);
      });
    },
  );

  it("should work resourceFromRouter is string", async () => {
    jest.spyOn(pickResource, "pickResource").mockReturnValueOnce({
      name: "posts",
      route: "/posts",
    });

    const { result, rerender } = renderHook(() => useShow(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
          },
        },
        resources: [{ name: "posts" }],
        routerProvider: mockRouterProvider({
          action: "show",
          resource: "posts" as unknown as IResourceItem,
          id: "1",
          pathname: "/posts/show/1",
        }),
      }),
    });

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
      expect(result.current.queryResult.data?.data).toEqual(posts[0]);
    });

    jest.spyOn(pickResource, "pickResource").mockReturnValueOnce(undefined);

    rerender();

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
      expect(result.current.queryResult.data?.data).toEqual(posts[0]);
    });
  });

  // NOTE : Will be removed in v5
  it.each([{ resource: "posts", id: "1" }, undefined])(
    "should work with legacy router provider. params: %s",
    async (useShowParams) => {
      const mockResourceWithRoute = jest.fn();
      jest
        .spyOn(useResourceWithRoute, "useResourceWithRoute")
        .mockReturnValue(mockResourceWithRoute);
      mockResourceWithRoute.mockReturnValue({
        name: "posts",
        route: "/posts/show/1",
      });

      const { result } = renderHook(() => useShow(useShowParams), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
            },
          },
          resources: [{ name: "posts" }],
          legacyRouterProvider: {
            ...mockLegacyRouterProvider(),
            useParams: () =>
              ({
                resource: "posts",
                id: "1",
              }) as any,
          },
        }),
      });

      expect(result.current.showId).toEqual("1");
      expect(mockResourceWithRoute).toBeCalled();

      await waitFor(() => {
        expect(result.current.queryResult.isSuccess).toBeTruthy();
        expect(result.current.queryResult.data?.data).toEqual(posts[0]);
      });
    },
  );

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = jest.fn();
    const { result } = renderHook(
      () =>
        useShow({
          resource: "posts",
          id: "1",
          overtimeOptions: {
            interval: 100,
            onInterval,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getOne: () => {
                return new Promise((res) => {
                  setTimeout(() => res({} as any), 1000);
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toBeCalled();
    });

    await waitFor(() => {
      expect(!result.current.queryResult.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("should work with queryResult and query", async () => {
    const { result } = renderHook(() => useShow(), {
      wrapper: WrapperWithRoute,
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
      expect(result.current.query).toEqual(result.current.queryResult);
    });
  });
});
