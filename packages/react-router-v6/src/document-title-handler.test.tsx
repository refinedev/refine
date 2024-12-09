import React, { type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

import { DocumentTitleHandler } from "./document-title-handler";
import { render, TestWrapper, type ITestWrapperProps } from "./test/index";
import { mockRouterBindings } from "./test/dataMocks";

const renderDocumentTitleHandler = (
  children: ReactNode,
  wrapperProps: ITestWrapperProps = {},
) => {
  return render(
    <>
      <Routes>
        <Route path="/:resource" element={<h1>Dummy resource page</h1>} />
        <Route
          path="/:resource/:action/:id"
          element={<h1>Dummy resource action page</h1>}
        />
        <Route path="*" element={<h1>Refine</h1>} />
      </Routes>
      {children}
    </>,
    {
      wrapper: TestWrapper(wrapperProps),
    },
  );
};

describe("<DocumentTitleHandler />", () => {
  it("should render default list title", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts", list: "/posts" }],
      routerInitialEntries: ["/posts"],
      routerProvider: mockRouterBindings({
        action: "list",
        resource: { name: "posts", list: "/posts" },
      }),
    });

    expect(document.title).toBe("Posts | Refine");
  });

  it("should render default create title", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts", create: "/posts/create" }],
      routerInitialEntries: ["/posts/create"],
      routerProvider: mockRouterBindings({
        action: "create",
        resource: { name: "posts", create: "/posts/create" },
      }),
    });

    expect(document.title).toBe("Create new Post | Refine");
  });

  it("should render default edit title", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts", edit: "/posts/edit/:id" }],
      routerInitialEntries: ["/posts/edit/1"],
      routerProvider: mockRouterBindings({
        action: "edit",
        resource: { name: "posts", edit: "/posts/edit/1" },
        id: "1",
      }),
    });

    expect(document.title).toBe("#1 Edit Post | Refine");
  });

  it("should render default show title", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts", show: "/posts/show/:id" }],
      routerInitialEntries: ["/posts/show/1"],
      routerProvider: mockRouterBindings({
        action: "show",
        resource: { name: "posts", show: "/posts/show/1" },
        id: "1",
      }),
    });

    expect(document.title).toBe("#1 Show Post | Refine");
  });

  it("should render default clone title", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts", clone: "/posts/clone/:id" }],
      routerInitialEntries: ["/posts/clone/1"],
      routerProvider: mockRouterBindings({
        action: "clone",
        resource: { name: "posts", clone: "/posts/clone/1" },
        id: "1",
      }),
    });

    expect(document.title).toBe("#1 Clone Post | Refine");
  });

  it("should render default title for unknown resource", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/unknown"],
      routerProvider: mockRouterBindings({
        action: "list",
        resource: undefined,
      }),
    });

    expect(document.title).toBe("Refine");
  });

  it("should render default title for unknown action", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts" }],
      routerInitialEntries: ["/posts/unknown"],
      routerProvider: mockRouterBindings({
        action: undefined,
        resource: {
          name: "posts",
        },
      }),
    });

    expect(document.title).toBe("Refine");
  });

  it("should use identifier", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [
        { name: "posts", list: "/posts", identifier: "Awesome Posts" },
      ],
      routerInitialEntries: ["/posts"],
      routerProvider: mockRouterBindings({
        action: "list",
        resource: {
          name: "posts",
          list: "/posts",
          identifier: "Awesome Posts",
        },
      }),
    });

    expect(document.title).toBe("Awesome posts | Refine");
  });

  it("should render custom title", async () => {
    renderDocumentTitleHandler(
      <DocumentTitleHandler
        handler={() => {
          return "Custom Title";
        }}
      />,
      {
        resources: [{ name: "posts", list: "/posts" }],
        routerInitialEntries: ["/posts"],
        routerProvider: mockRouterBindings({
          action: "list",
          resource: { name: "posts", list: "/posts" },
        }),
      },
    );

    expect(document.title).toBe("Custom Title");
  });

  it("should label be populated with friendly resource name on handler function", async () => {
    renderDocumentTitleHandler(
      <DocumentTitleHandler
        handler={({ resource, autoGeneratedTitle }) => {
          const label = resource?.label;
          const labelMeta = resource?.meta?.label;

          expect(labelMeta).toBe(label);
          expect(labelMeta).toBe("Posts");

          return autoGeneratedTitle;
        }}
      />,
      {
        resources: [{ name: "posts", list: "/posts" }],
        routerInitialEntries: ["/posts"],
        routerProvider: mockRouterBindings({
          action: "list",
          resource: { name: "posts", list: "/posts" },
        }),
      },
    );
  });

  it("should use label from resource if its provided", async () => {
    renderDocumentTitleHandler(<DocumentTitleHandler />, {
      resources: [{ name: "posts", list: "/posts", label: "Labeled Posts" }],
      routerInitialEntries: ["/posts"],
      routerProvider: mockRouterBindings({
        action: "list",
        resource: { name: "posts", list: "/posts", label: "Labeled Posts" },
      }),
    });

    expect(document.title).toBe("Labeled Posts | Refine");
  });
});
