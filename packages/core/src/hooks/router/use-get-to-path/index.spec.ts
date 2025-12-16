import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useGetToPath } from "./";

describe("useGetToPath Hook", () => {
  describe("when resource is not provided", () => {
    it("should return undefined if no resource found in route", () => {
      const { result } = renderHook(() => useGetToPath(), {
        wrapper: TestWrapper({}),
      });

      const path = result.current({
        action: "list",
      });

      expect(path).toEqual(undefined);
    });
  });

  describe("when resource is provided", () => {
    it("should return path for the given action", () => {
      const { result } = renderHook(() => useGetToPath(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
              create: "/posts/create",
            },
          ],
        }),
      });

      expect(
        result.current({
          action: "list",
          resource: { name: "posts" },
        }),
      ).toEqual("/posts");

      expect(
        result.current({
          action: "create",
          resource: { name: "posts" },
        }),
      ).toEqual("/posts/create");
    });

    it("should return undefined if action route is not defined", () => {
      const { result } = renderHook(() => useGetToPath(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
              list: "/posts",
            },
          ],
        }),
      });

      const path = result.current({
        action: "edit",
        resource: { name: "posts" },
      });

      expect(path).toEqual(undefined);
    });

    it("should lookup full resource definition from resources array", () => {
      const { result } = renderHook(() => useGetToPath(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
              create: "/posts/create",
            },
          ],
        }),
      });

      // Even if we pass a partial resource (only name), it should find the full definition
      const path = result.current({
        action: "list",
        resource: { name: "posts" },
      });

      expect(path).toEqual("/posts");
    });

    it("should compose route with meta parameters", () => {
      const { result } = renderHook(() => useGetToPath(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
              show: "/posts/show/:id",
            },
          ],
        }),
      });

      const path = result.current({
        action: "show",
        resource: { name: "posts" },
        meta: { id: "123" },
      });

      expect(path).toEqual("/posts/show/123");
    });
  });
});
