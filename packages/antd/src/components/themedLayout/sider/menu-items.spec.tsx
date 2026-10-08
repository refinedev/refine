import React from "react";
import { vi } from "vitest";
import { Menu } from "antd";
import type { AccessControlProvider, IResourceItem } from "@refinedev/core";

import { render, TestWrapper } from "@test";

import { ThemedSider } from "./index";

const resources: IResourceItem[] = [
  { name: "posts", list: "/posts" },
  { name: "users", list: "/users" },
  { name: "cms" },
  { name: "categories", list: "/categories", meta: { parent: "cms" } },
  { name: "tags", list: "/tags", meta: { parent: "cms" } },
  { name: "admin" },
  { name: "audits", list: "/audits", meta: { parent: "admin" } },
];

const denied = new Set(["users", "tags", "admin"]);

const can = vi.fn<AccessControlProvider["can"]>(async ({ resource }) => ({
  can: !denied.has(resource ?? ""),
}));

const accessControlProvider: AccessControlProvider = { can };

// The `render` prop is element based and still renders `<Menu>` children, so it is not covered here.
const collectAntdWarnings = () => {
  const messages: string[] = [];
  const collect = (...args: unknown[]) => {
    const message = args.map(String).join(" ");
    if (message.includes("[antd:")) messages.push(message);
  };
  const spies = [
    vi.spyOn(console, "error").mockImplementation(collect),
    vi.spyOn(console, "warn").mockImplementation(collect),
  ];

  return {
    messages,
    restore: () => spies.forEach((spy) => spy.mockRestore()),
  };
};

const MENU_CHILDREN_DEPRECATED =
  "Warning: [antd: Menu] `children` is deprecated. Please use `items` instead.";

describe("ThemedSider menu items", () => {
  beforeEach(() => {
    can.mockClear();
  });

  it.each([
    {
      name: "without `render`",
      sider: <ThemedSider siderItemsAreCollapsed={false} />,
      customItem: false,
      warnings: [],
    },
    {
      name: "with `render` returning `menuItems` data",
      sider: (
        <ThemedSider
          siderItemsAreCollapsed={false}
          render={({ menuItems, logoutItem }) => [
            ...menuItems,
            { key: "custom", label: "Custom" },
            logoutItem,
          ]}
        />
      ),
      customItem: true,
      warnings: [],
    },
    {
      name: "with `render` returning the legacy `items` elements",
      sider: (
        <ThemedSider
          siderItemsAreCollapsed={false}
          render={({ items, logout }) => (
            <>
              {items}
              <Menu.Item key="custom">Custom</Menu.Item>
              {logout}
            </>
          )}
        />
      ),
      customItem: true,
      // still supported, but rendered as `<Menu>` children which antd reports as deprecated
      warnings: [MENU_CHILDREN_DEPRECATED],
    },
  ])(
    "$name: hides items denied by access control",
    async ({ sider, customItem, warnings: expectedWarnings }) => {
      const warnings = collectAntdWarnings();

      try {
        const { findByText, queryByText } = render(sider, {
          wrapper: TestWrapper({ resources, accessControlProvider }),
        });

        expect(await findByText("Posts")).toBeTruthy();
        // nested item under an accessible parent
        expect(await findByText("Categories")).toBeTruthy();
        if (customItem) expect(queryByText("Custom")).toBeTruthy();

        // denied top level item, denied nested item, and a granted child of a denied parent
        expect(queryByText("Users")).toBeNull();
        expect(queryByText("Tags")).toBeNull();
        expect(queryByText("Admin")).toBeNull();
        expect(queryByText("Audits")).toBeNull();

        // no empty placeholder is left behind for denied items
        expect(document.querySelectorAll("li.ant-menu-item")).toHaveLength(
          customItem ? 3 : 2,
        );

        // like nested `<CanAccess>`, children of a denied parent are never checked
        const checked = can.mock.calls.map(([params]) => params.resource);
        expect(checked).toContain("categories");
        expect(checked).not.toContain("audits");

        expect(Array.from(new Set(warnings.messages))).toEqual(
          expectedWarnings,
        );
      } finally {
        warnings.restore();
      }
    },
    15000,
  );
});
