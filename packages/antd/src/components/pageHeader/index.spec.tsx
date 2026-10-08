import React from "react";
import { act, fireEvent, render, TestWrapper } from "@test";
import { PageHeader } from "./";
import { ConfigProvider, Tag, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { vi } from "vitest";

const renderPageHeader = (ui: React.ReactElement) =>
  render(ui, { wrapper: TestWrapper({}) });

const hasClass = (element: Element | null, className: string) =>
  !!element?.classList.contains(className);

/** Color in the form jsdom serializes it, so `#fff` and `rgb(…)` compare equal. */
const normalizeColor = (color: string) => {
  const element = document.createElement("div");
  element.style.color = color;
  return element.style.color;
};

/**
 * jsdom does not resolve `var()` in computed styles and does not inherit
 * custom properties: they are only readable on the element declaring them
 * (the root, which carries the antd `css-var-*` class). Resolve by hand.
 */
const computed = (element: Element, property: string, scope = element) => {
  let value = getComputedStyle(element).getPropertyValue(property).trim();
  for (let depth = 0; depth < 5; depth++) {
    const reference = value.match(/^var\((--[\w-]+)\)$/);
    if (!reference) break;
    value = getComputedStyle(scope).getPropertyValue(reference[1]).trim();
  }
  return value;
};

const computedColor = (element: Element, property: string) =>
  normalizeColor(computed(element, property));

describe("PageHeader", () => {
  it("should render default back button with respect to direction from config", async () => {
    const { rerender, queryByLabelText } = render(
      <ConfigProvider>
        <PageHeader onBack={() => 0} title="title">
          content
        </PageHeader>
      </ConfigProvider>,
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(queryByLabelText("arrow-left")).toBeTruthy();
    expect(queryByLabelText("arrow-right")).toBeFalsy();

    rerender(
      <ConfigProvider direction="rtl">
        <PageHeader onBack={() => 0} title="title">
          content
        </PageHeader>
      </ConfigProvider>,
    );

    expect(queryByLabelText("arrow-left")).toBeFalsy();
    expect(queryByLabelText("arrow-right")).toBeTruthy();
  });

  it("should keep the pro-layout class names", () => {
    const { container } = renderPageHeader(
      <PageHeader title="Posts" subTitle="All posts">
        content
      </PageHeader>,
    );

    const root = container.querySelector<HTMLElement>(".ant-page-header");
    expect(root).toBeTruthy();
    expect(hasClass(root, "ant-page-header-ghost")).toBe(true);
    expect(hasClass(root, "ant-page-header-has-breadcrumb")).toBe(false);
    expect(hasClass(root, "ant-page-header-has-footer")).toBe(false);
    expect(hasClass(root, "ant-page-header-rtl")).toBe(false);
    expect(root?.style.padding).toBe("0px");

    const left = container.querySelector(
      ".ant-page-header-heading > .ant-page-header-heading-left",
    );
    expect(left).toBeTruthy();
    expect(
      left?.querySelector(
        ".ant-page-header-heading-title > .refine-pageHeader-title",
      )?.textContent,
    ).toBe("Posts");
    expect(
      left?.querySelector(
        ".ant-page-header-heading-sub-title > .refine-pageHeader-subTitle",
      )?.textContent,
    ).toBe("All posts");
    expect(
      container.querySelector(".ant-page-header > .ant-page-header-content")
        ?.textContent,
    ).toBe("content");
  });

  it("should render the back button only when onBack is given", () => {
    const { container, rerender } = renderPageHeader(
      <PageHeader title="Posts">content</PageHeader>,
    );

    expect(container.querySelector(".ant-page-header-back")).toBeNull();

    const onBack = vi.fn();
    rerender(
      <PageHeader title="Posts" onBack={onBack}>
        content
      </PageHeader>,
    );

    const backButton = container.querySelector(
      ".ant-page-header-heading-left > .ant-page-header-back > .ant-page-header-back-button",
    );
    expect(backButton?.getAttribute("role")).toBe("button");
    expect(backButton?.getAttribute("aria-label")).toBe("back");

    const antdButton = container.querySelector(
      ".ant-page-header-back-button > .ant-btn",
    );
    expect(antdButton).toBeTruthy();

    fireEvent.click(antdButton as Element);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should render breadcrumb from items", () => {
    const { container } = renderPageHeader(
      <PageHeader
        title="Posts"
        breadcrumb={{ items: [{ title: "Home" }, { title: "Posts" }] }}
      >
        content
      </PageHeader>,
    );

    const root = container.querySelector(".ant-page-header");
    expect(hasClass(root, "ant-page-header-has-breadcrumb")).toBe(true);

    const breadcrumb = container.querySelector(
      ".ant-page-header > .ant-page-header-breadcrumb",
    );
    expect(hasClass(breadcrumb, "ant-breadcrumb")).toBe(true);
    expect(breadcrumb?.textContent).toContain("Home");
  });

  it("should not render breadcrumb when items are empty", () => {
    const { container } = renderPageHeader(
      <PageHeader title="Posts" breadcrumb={{ items: [] }}>
        content
      </PageHeader>,
    );

    expect(container.querySelector(".ant-page-header-breadcrumb")).toBeNull();
    expect(
      hasClass(
        container.querySelector(".ant-page-header"),
        "ant-page-header-has-breadcrumb",
      ),
    ).toBe(false);
  });

  it("should render extra and tags", () => {
    const { container } = renderPageHeader(
      <PageHeader
        title="Posts"
        extra={<button type="button">Create</button>}
        tags={<Tag>Draft</Tag>}
      >
        content
      </PageHeader>,
    );

    expect(
      container.querySelector(
        ".ant-page-header-heading > .ant-page-header-heading-extra",
      )?.textContent,
    ).toBe("Create");
    expect(
      container.querySelector(
        ".ant-page-header-heading-left > .ant-page-header-heading-tags",
      )?.textContent,
    ).toBe("Draft");
  });

  it("should render footer", () => {
    const { container } = renderPageHeader(
      <PageHeader title="Posts" footer="Footer content">
        content
      </PageHeader>,
    );

    expect(
      hasClass(
        container.querySelector(".ant-page-header"),
        "ant-page-header-has-footer",
      ),
    ).toBe(true);
    expect(
      container.querySelector(".ant-page-header > .ant-page-header-footer")
        ?.textContent,
    ).toBe("Footer content");
  });

  it("should apply rtl direction from config", () => {
    const { container } = renderPageHeader(
      <ConfigProvider direction="rtl">
        <PageHeader title="Posts">content</PageHeader>
      </ConfigProvider>,
    );

    const root = container.querySelector<HTMLElement>(".ant-page-header");
    expect(hasClass(root, "ant-page-header-rtl")).toBe(true);
    expect(getComputedStyle(root as HTMLElement).direction).toBe("rtl");
  });

  it("should use the prefixCls from config", () => {
    const { container } = renderPageHeader(
      <ConfigProvider prefixCls="custom">
        <PageHeader title="Posts">content</PageHeader>
      </ConfigProvider>,
    );

    expect(container.querySelector(".custom-page-header")).toBeTruthy();
    expect(
      container.querySelector(".custom-page-header-heading-left"),
    ).toBeTruthy();
  });

  it("should style with classes so that user CSS can override", () => {
    const { container } = renderPageHeader(
      <PageHeader title="Posts">content</PageHeader>,
    );

    const content = container.querySelector<HTMLElement>(
      ".ant-page-header-content",
    ) as HTMLElement;
    const title = container.querySelector(".ant-page-header-heading-title");
    expect(content.getAttribute("style")).toBeNull();
    expect(title?.getAttribute("style")).toBeNull();
    const root = container.querySelector(".ant-page-header") as HTMLElement;
    expect(computed(content, "padding-block-start", root)).toBe("12px");

    // Same rule as `examples/invoicer/src/styles/custom.css`.
    const userStyle = document.createElement("style");
    userStyle.textContent =
      ".ant-page-header-content { padding-block-start: 32px; }";
    document.head.appendChild(userStyle);
    try {
      expect(getComputedStyle(content).paddingBlockStart).toBe("32px");
    } finally {
      userStyle.remove();
    }
  });

  it("should convert breadcrumb routes to items", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    try {
      const { container } = renderPageHeader(
        <PageHeader
          title="Posts"
          breadcrumb={{
            routes: [
              { path: "/", breadcrumbName: "Home" },
              {
                path: "/posts",
                title: "Posts",
                children: [{ path: "/posts/1", breadcrumbName: "First" }],
              },
            ],
          }}
        >
          content
        </PageHeader>,
      );

      const root = container.querySelector(".ant-page-header");
      expect(hasClass(root, "ant-page-header-has-breadcrumb")).toBe(true);

      const breadcrumb = container.querySelector(
        ".ant-page-header > .ant-page-header-breadcrumb",
      );
      expect(breadcrumb?.textContent).toContain("Home");
      expect(
        breadcrumb?.querySelector(".ant-breadcrumb-overlay-link")?.textContent,
      ).toContain("Posts");

      const messages = consoleError.mock.calls.flat().map(String).join("\n");
      expect(messages).not.toContain("[antd: Breadcrumb]");
    } finally {
      consoleError.mockRestore();
    }
  });

  it("should not render breadcrumb from routes when items are empty", () => {
    const { container } = renderPageHeader(
      <PageHeader
        title="Posts"
        breadcrumb={{ items: [], routes: [{ breadcrumbName: "Home" }] }}
      >
        content
      </PageHeader>,
    );

    expect(container.querySelector(".ant-breadcrumb")).toBeNull();
    expect(
      hasClass(
        container.querySelector(".ant-page-header"),
        "ant-page-header-has-breadcrumb",
      ),
    ).toBe(false);
  });

  it("should use breadcrumbRender", () => {
    const breadcrumbRender = vi.fn(
      (props: { prefixCls?: string }, defaultDom: React.ReactNode) => (
        <div className="custom-breadcrumb" data-prefix={props.prefixCls}>
          {defaultDom}
        </div>
      ),
    );

    const { container } = renderPageHeader(
      <PageHeader
        title="Posts"
        breadcrumb={{ items: [{ title: "Home" }] }}
        breadcrumbRender={breadcrumbRender}
      >
        content
      </PageHeader>,
    );

    const custom = container.querySelector(
      ".ant-page-header > .custom-breadcrumb",
    );
    expect(custom?.getAttribute("data-prefix")).toBe("ant-page-header");
    expect(
      custom?.querySelector(".ant-page-header-breadcrumb")?.textContent,
    ).toContain("Home");
  });

  it("should not be ghost when ghost is false", () => {
    const { container } = renderPageHeader(
      <PageHeader title="Posts" ghost={false}>
        content
      </PageHeader>,
    );

    const root = container.querySelector(".ant-page-header") as HTMLElement;
    expect(hasClass(root, "ant-page-header-ghost")).toBe(false);
    expect(computedColor(root, "background-color")).toBe(
      normalizeColor(theme.getDesignToken().colorBgContainer),
    );
  });

  it.each([
    ["dark to light", theme.darkAlgorithm, theme.defaultAlgorithm],
    ["light to dark", theme.defaultAlgorithm, theme.darkAlgorithm],
  ])("should follow the theme when it switches from %s", (_, first, second) => {
    const ui = (algorithm: typeof first) => (
      <ConfigProvider theme={{ algorithm }}>
        <PageHeader title="Posts" ghost={false}>
          content
        </PageHeader>
      </ConfigProvider>
    );
    const { container, rerender } = renderPageHeader(ui(first));

    for (const algorithm of [first, second]) {
      rerender(ui(algorithm));
      const root = container.querySelector(".ant-page-header") as HTMLElement;
      const token = theme.getDesignToken({ algorithm });
      expect(computedColor(root, "color")).toBe(
        normalizeColor(token.colorText),
      );
      expect(computedColor(root, "background-color")).toBe(
        normalizeColor(token.colorBgContainer),
      );
    }
  });

  it("should use the closest theme with nested ConfigProviders", () => {
    const outerToken = { colorText: "#111111", colorBgContainer: "#eeeeee" };
    const innerToken = { colorText: "#222222", colorBgContainer: "#dddddd" };

    const { container } = renderPageHeader(
      <ConfigProvider theme={{ token: outerToken }}>
        <PageHeader title="Outer" ghost={false} className="outer">
          <ConfigProvider theme={{ token: innerToken }}>
            <PageHeader title="Inner" ghost={false} className="inner">
              content
            </PageHeader>
          </ConfigProvider>
        </PageHeader>
      </ConfigProvider>,
    );

    for (const [selector, token] of [
      [".outer", outerToken],
      [".inner", innerToken],
    ] as const) {
      const root = container.querySelector(selector) as HTMLElement;
      expect(computedColor(root, "color")).toBe(
        normalizeColor(token.colorText),
      );
      expect(computedColor(root, "background-color")).toBe(
        normalizeColor(token.colorBgContainer),
      );
    }
  });

  it("should put its styles in the antd layer under StyleProvider layer", () => {
    renderPageHeader(
      <StyleProvider layer>
        <PageHeader title="Posts">content</PageHeader>
      </StyleProvider>,
    );

    const layerOf = (selector: string) => {
      const text = Array.from(document.head.querySelectorAll("style"))
        .map((style) => style.textContent ?? "")
        .find((css) => css.includes(selector) && css.startsWith("@layer"));
      return text?.match(/^@layer ([\w-]+)\s*\{/)?.[1];
    };

    // `.ant-typography` comes from the antd `<Typography.Title>` of the title.
    expect(layerOf(".ant-typography")).toBe("antd");
    expect(layerOf(".ant-page-header-content")).toBe("antd");
  });

  it("should render avatar", () => {
    const { container } = renderPageHeader(
      <PageHeader title="Posts" avatar={{ alt: "A", className: "my-avatar" }}>
        content
      </PageHeader>,
    );

    const avatar = container.querySelector(
      ".ant-page-header-heading-left > .ant-page-header-heading-avatar",
    );
    expect(hasClass(avatar, "ant-avatar")).toBe(true);
    expect(hasClass(avatar, "my-avatar")).toBe(true);
  });

  it("should be compact when the header itself is narrower than 768px", () => {
    const callbacks = new Map<Element, () => void>();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(private callback: () => void) {}
        observe(element: Element) {
          callbacks.set(element, this.callback);
        }
        unobserve() {}
        disconnect() {}
      },
    );

    try {
      const { container } = renderPageHeader(
        <PageHeader title="Posts">content</PageHeader>,
      );
      const root = container.querySelector(".ant-page-header") as HTMLElement;
      const resize = (width: number) => {
        vi.spyOn(root, "getBoundingClientRect").mockReturnValue({
          width,
        } as DOMRect);
        act(() => callbacks.get(root)?.());
      };

      expect(callbacks.has(root)).toBe(true);
      expect(hasClass(root, "ant-page-header-compact")).toBe(false);

      resize(767);
      expect(hasClass(root, "ant-page-header-compact")).toBe(true);

      resize(768);
      expect(hasClass(root, "ant-page-header-compact")).toBe(false);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("should render an empty placeholder when there is nothing to show", () => {
    const { container } = renderPageHeader(<PageHeader />);

    expect(container.querySelector(".ant-page-header")).toBeNull();
    expect(
      container.querySelector(".ant-page-header-no-children"),
    ).toBeTruthy();
  });
});
