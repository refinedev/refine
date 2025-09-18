import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { configure } from "@testing-library/dom";
import { vi } from "vitest";

// Mock ReactDOM.render for React 19 compatibility with antd/rc-util
vi.mock("react-dom", async () => {
  const originalModule = await vi.importActual("react-dom");
  return {
    ...originalModule,
    render: vi.fn((element: any, container: any) => {
      // Use createRoot for React 19 compatibility
      if (originalModule.createRoot && container) {
        const root = originalModule.createRoot(container);
        root.render(element);
        return root;
      }
      return originalModule.render?.(element, container);
    }),
  };
});

// Mock CSS imports
vi.mock("*.css", () => ({}));

// Mock SVG imports
vi.mock("*.svg", () => ({
  default: "svg-module",
  ReactComponent: "svg",
}));

configure({
  asyncUtilTimeout: 10000,
});

/** Antd mocks */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => {
    const mediaQuery = {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn((listener) => {
        if (typeof listener === "function") {
          listener({ matches: false, media: query });
        }
      }),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, listener) => {
        if (event === "change" && typeof listener === "function") {
          listener({ matches: false, media: query });
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
    return mediaQuery;
  }),
});

// ResizeObserver mock for Ant Design components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Properly setup TextEncoder/TextDecoder for Node.js environment
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

window.scroll = vi.fn();
window.alert = vi.fn();
