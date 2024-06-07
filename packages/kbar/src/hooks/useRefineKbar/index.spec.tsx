import React from "react";
import type { AccessControlProvider, IResourceItem } from "@refinedev/core";
import { Route, Routes } from "react-router-dom";

import { act, TestWrapper, renderHook } from "@test";

import { useRefineKbar } from ".";

const mockFn = jest.fn();

jest.mock("kbar", () => ({
  ...(jest.requireActual("kbar") as typeof import("kbar")),
  useRegisterActions: (actions: any) => mockFn(actions),
}));

describe("useRefineKbar Hook", () => {
  beforeAll(async () => {
    jest.useFakeTimers();
  });

  afterAll(async () => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  const createRenderHook = async (
    resources: IResourceItem[],
    path?: string,
    routerInitialEntries?: string[],
    accessControlProvider?: AccessControlProvider,
  ) => {
    let Wrapper: React.FC<{ children: React.ReactNode }> = TestWrapper({
      resources,
    });

    if (routerInitialEntries) {
      Wrapper = TestWrapper({
        resources,
        routerInitialEntries,
        accessControlProvider,
      });
    }

    renderHook(() => useRefineKbar(), {
      wrapper: function render({ children }) {
        return (
          <Wrapper>
            <Routes>
              <Route path={path ?? "/:resource"} element={children} />
            </Routes>
          </Wrapper>
        );
      },
    });
  };
  describe("list resources", () => {
    it("registering the list resource when you are not on the list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>list page</div>;
            },
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the list resource when you are on the list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>list page</div>;
            },
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the list resource when you don't have access to list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>create page</div>;
            },
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
        {
          can: () => Promise.resolve({ can: false }),
        },
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("create resources", () => {
    it("registering the create resource when you are not on the create page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: function name() {
              return <div>create page</div>;
            },
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the create resource when you have access to create", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: function name() {
              return <div>create page</div>;
            },
          },
        ],
        "/:resource",
        ["/posts"],
        {
          can: () => Promise.resolve({ can: true }),
        },
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the create resource when you are on the create page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: function name() {
              return <div>create page</div>;
            },
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the create resource when you don't have access to create page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            create: function name() {
              return <div>create page</div>;
            },
          },
        ],
        "/:resource",
        ["/posts"],
        {
          can: () => Promise.resolve({ can: false }),
        },
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Create",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("edit resources", () => {
    it("registering the edit resource when you have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: function name() {
              return <div>edit page</div>;
            },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/show/1"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the delete for resource when you have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: function name() {
              return <div>edit page</div>;
            },
            canDelete: true,
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Delete",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the edit resource when you do not have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: function name() {
              return <div>edit page</div>;
            },
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the edit resource when you are on the edit page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: function name() {
              return <div>edit page</div>;
            },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the delete for resource when you 'canDelete' false", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: function name() {
              return <div>edit page</div>;
            },
            canDelete: false,
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Delete",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the delete for resource when you don't have access to delete", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: function name() {
              return <div>edit page</div>;
            },
            canDelete: true,
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
        {
          can: () => {
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Delete",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the edit resource when you don't have an edit resource", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>list page</div>;
            },
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource if your id doesn't have access to edit the page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            edit: function name() {
              return <div>edit page</div>;
            },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/show/2"],
        {
          can: ({ params }) => {
            if (params?.id === "1") {
              return Promise.resolve({ can: true });
            }
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Edit",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("show resources", () => {
    it("registering the show resource when you have an id from the route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: function name() {
              return <div>show page</div>;
            },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the show resource when your id have access to show the page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: function name() {
              return <div>show page</div>;
            },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/1"],
        {
          can: ({ params }) => {
            if (params?.id === "1") {
              return Promise.resolve({ can: true });
            }
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource when you don't have an id from route", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: function name() {
              return <div>show page</div>;
            },
          },
        ],
        "/:resource/:action",
        ["/posts/create"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource when you are on the show page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: function name() {
              return <div>show page</div>;
            },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/show/1"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
    it("do not register the show resource if your id doesn't have access to show the page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            show: function name() {
              return <div>show page</div>;
            },
          },
        ],
        "/:resource/:action/:id",
        ["/posts/edit/2"],
        {
          can: ({ params }) => {
            if (params?.id === "1") {
              return Promise.resolve({ can: true });
            }
            return Promise.resolve({ can: false });
          },
        },
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Show",
            section: "Posts",
          }),
        ]),
      );
    });
  });

  describe("multiple resources", () => {
    it("registering the posts list resource when you are on the categories list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>posts list page</div>;
            },
          },
          {
            name: "categories",
            list: function name() {
              return <div>categories list page</div>;
            },
          },
        ],
        "/:resource",
        ["/categories"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
    it("registering the categories list resource when you are on the post list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>posts list page</div>;
            },
          },
          {
            name: "categories",
            list: function name() {
              return <div>categories list page</div>;
            },
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Categories",
          }),
        ]),
      );
    });
    it("registering the categories list resource when you are on the post list page while you have three resources", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>posts list page</div>;
            },
          },
          {
            name: "categories",
            list: function name() {
              return <div>categories list page</div>;
            },
          },
          {
            name: "users",
            list: function name() {
              return <div>users list page</div>;
            },
          },
        ],
        "/:resource",
        ["/posts"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Categories",
          }),
        ]),
      );
      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Users",
          }),
        ]),
      );

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "List",
          }),
        ]),
      );
    });
    it("do not register the categories list resource when you are on the categories list page", async () => {
      createRenderHook(
        [
          {
            name: "posts",
            list: function name() {
              return <div>posts list page</div>;
            },
          },
          {
            name: "categories",
            list: function name() {
              return <div>categories list page</div>;
            },
          },
        ],
        "/:resource",
        ["/categories"],
      );

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(mockFn).not.lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Categories",
          }),
        ]),
      );

      expect(mockFn).lastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "List",
            section: "Posts",
          }),
        ]),
      );
    });
  });
});
