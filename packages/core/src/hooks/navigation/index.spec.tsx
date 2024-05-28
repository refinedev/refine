import { renderHook } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  mockLegacyRouterProvider,
  mockRouterProvider,
} from "@test";

import { useNavigation } from ".";
import type { LegacyRouterProvider } from "../../contexts/router/legacy/types";

const legacyPushMock = jest.fn();
const legacyReplaceMock = jest.fn();
const legacyBackMock = jest.fn();

const legacyRouterProvider: LegacyRouterProvider = {
  ...mockLegacyRouterProvider(),
  useHistory: () => {
    return {
      push: legacyPushMock,
      replace: legacyReplaceMock,
      goBack: legacyBackMock,
    };
  },
};

const goMock = jest.fn();
const backMock = jest.fn();

const routerProvider = mockRouterProvider({
  fns: {
    go: () => {
      return ({ to, type, ...rest }) => {
        if (type === "path") return to;
        goMock({ to, type, ...rest });
        return undefined;
      };
    },
    back: () => backMock,
  },
});

describe("useNavigation Hook [new]", () => {
  beforeEach(() => {
    goMock.mockReset();
    backMock.mockReset();
  });

  describe("navigation methods with resource actions", () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        routerProvider,
        resources: [
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            clone: "/posts/create/:id",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
          },
        ],
      }),
    });

    it("navigate to show page with push", async () => {
      result.current.show("posts", "1", "push");

      expect(goMock).toBeCalledWith({
        to: "/posts/show/1",
        type: "push",
      });
    });

    it("navigate to create page with push", async () => {
      result.current.create("posts", "push");

      expect(goMock).toBeCalledWith({
        to: "/posts/create",
        type: "push",
      });
    });

    it("navigate to edit page with push", async () => {
      result.current.edit("posts", "1", "push");

      expect(goMock).toBeCalledWith({
        to: "/posts/edit/1",
        type: "push",
      });
    });

    it("navigate to clone page with push", async () => {
      result.current.clone("posts", "1", "push");

      expect(goMock).toBeCalledWith({
        to: "/posts/create/1",
        type: "push",
      });
    });

    it("navigate to list page with push", async () => {
      result.current.list("posts", "push");

      expect(goMock).toBeCalledWith({ to: "/posts", type: "push" });
    });

    it("navigate a page using push method", async () => {
      result.current.push("/posts");

      expect(goMock).toBeCalledWith({ to: "/posts", type: "push" });
    });

    it("navigate a page using replace method", async () => {
      result.current.replace("/posts/show/1");

      expect(goMock).toBeCalledWith({
        to: "/posts/show/1",
        type: "replace",
      });
    });

    it("navigation with goBack", async () => {
      result.current.goBack();

      expect(backMock).toBeCalledTimes(1);
    });

    it("by default navigation methods should use push", async () => {
      result.current.show("posts", "1");
      result.current.create("posts");
      result.current.edit("posts", "1");
      result.current.clone("posts", "1");
      result.current.list("posts");

      expect(goMock).toBeCalledTimes(5);
      expect(goMock).toBeCalledWith(expect.objectContaining({ type: "push" }));
    });
  });

  describe("navigation methods without resource actions", () => {
    it("if resource has no actions, it pass empty string to go method", async () => {
      const { result } = renderHook(() => useNavigation(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          routerProvider,
          resources: [{ name: "users" }],
        }),
      });

      result.current.show("posts", "1", "push");
      expect(goMock).toBeCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.create("posts", "push");
      expect(goMock).toBeCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.edit("posts", "1", "push");
      expect(goMock).toBeCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.clone("posts", "1", "push");
      expect(goMock).toBeCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();

      result.current.list("posts", "push");
      expect(goMock).toBeCalledWith({
        to: "",
        type: "push",
      });
      goMock.mockReset();
    });
  });

  it("should return correct path for a passed resource", async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        routerProvider,
        resources: [{ name: "posts" }],
      }),
    });

    const createPath = result.current.createUrl({
      name: "posts",
      create: "/posts/create",
    });
    expect(createPath).toBe("/posts/create");

    const listPath = result.current.listUrl({
      name: "posts",
      list: "/posts",
    });
    expect(listPath).toBe("/posts");

    const editPath = result.current.editUrl(
      { name: "posts", edit: "/posts/edit/:id" },
      "1",
    );
    expect(editPath).toBe("/posts/edit/1");

    const showPath = result.current.showUrl(
      { name: "posts", show: "/posts/show/:id" },
      "1",
    );
    expect(showPath).toBe("/posts/show/1");

    const clonePath = result.current.cloneUrl(
      { name: "posts", clone: "/posts/create/:id" },
      "1",
    );
    expect(clonePath).toBe("/posts/create/1");
  });
});

describe("useNavigation Hook [legacy]", () => {
  beforeEach(() => {
    legacyBackMock.mockReset();
    legacyPushMock.mockReset();
    legacyReplaceMock.mockReset();
  });

  describe("navigation methods with resource actions", () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [
          {
            name: "posts",
            route: "posts",
            create: () => null,
            list: () => null,
            edit: () => null,
            show: () => null,
          },
          {
            name: "users",
            route: "users-custom-route",
            // options: {
            //     route: "users-custom-route",
            // },
          },
        ],
        legacyRouterProvider,
      }),
    });

    it("navigate to show with custom route", async () => {
      result.current.show("users", "1", "push");

      expect(legacyPushMock).toBeCalledWith("/users-custom-route/show/1");
    });

    it("navigation create with push", async () => {
      result.current.create("posts", "push");

      expect(legacyPushMock).toBeCalledWith("/posts/create");
    });

    it("navigation create with replace", async () => {
      result.current.create("posts", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts/create");
    });

    it("navigation edit with push", async () => {
      result.current.edit("posts", "1", "push");

      expect(legacyPushMock).toBeCalledWith("/posts/edit/1");

      legacyPushMock.mockReset();

      result.current.edit("posts", "foo/1", "push");

      expect(legacyPushMock).toBeCalledWith("/posts/edit/foo%2F1");
    });

    it("navigation edit with replace", async () => {
      result.current.edit("posts", "1", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts/edit/1");

      legacyReplaceMock.mockReset();
      result.current.edit("posts", "foo/1", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts/edit/foo%2F1");
    });

    it("navigation clone with push", async () => {
      result.current.clone("posts", "1", "push");

      expect(legacyPushMock).toBeCalledWith("/posts/clone/1");

      legacyPushMock.mockReset();
      result.current.clone("posts", "foo/1", "push");

      expect(legacyPushMock).toBeCalledWith("/posts/clone/foo%2F1");
    });

    it("navigation clone with replace", async () => {
      result.current.clone("posts", "1", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts/clone/1");

      legacyReplaceMock.mockReset();
      result.current.clone("posts", "foo/1", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts/clone/foo%2F1");
    });

    it("navigation show with push", async () => {
      result.current.show("posts", "1", "push");

      expect(legacyPushMock).toBeCalledWith("/posts/show/1");

      legacyPushMock.mockReset();
      result.current.show("posts", "foo/1", "push");

      expect(legacyPushMock).toBeCalledWith("/posts/show/foo%2F1");
    });

    it("navigation show with replace", async () => {
      result.current.show("posts", "1", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts/show/1");

      legacyReplaceMock.mockReset();
      result.current.show("posts", "foo/1", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts/show/foo%2F1");
    });

    it("navigation list with push", async () => {
      result.current.list("posts", "push");

      expect(legacyPushMock).toBeCalledWith("/posts");
    });

    it("navigation list with replace", async () => {
      result.current.list("posts", "replace");

      expect(legacyReplaceMock).toBeCalledWith("/posts");
    });

    it("navigation push", async () => {
      result.current.push("/posts");

      expect(legacyPushMock).toBeCalledWith("/posts");
    });

    it("navigation replace", async () => {
      result.current.replace("/posts");

      expect(legacyReplaceMock).toBeCalledWith("/posts");
    });

    it("navigation goBack", async () => {
      result.current.goBack();

      expect(legacyBackMock).toBeCalledTimes(1);
    });
  });

  it("should return correct path for a passed resource", async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "users" }],
        legacyRouterProvider,
      }),
    });

    const createPath = result.current.createUrl({ name: "posts" });
    expect(createPath).toBe("/posts/create");

    const listPath = result.current.listUrl({ name: "posts" });
    expect(listPath).toBe("/posts");

    const editPath = result.current.editUrl({ name: "posts" }, "1");
    expect(editPath).toBe("/posts/edit/1");

    const showPath = result.current.showUrl({ name: "posts" }, "1");
    expect(showPath).toBe("/posts/show/1");

    const clonePath = result.current.cloneUrl({ name: "posts" }, "1");
    expect(clonePath).toBe("/posts/clone/1");
  });
});
