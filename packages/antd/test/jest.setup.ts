import "@testing-library/jest-dom";
import "@testing-library/react";
import { configure } from "@testing-library/dom";
import * as util from "util";

// Mock ReactDOM.render for React 19 compatibility with antd/rc-util
jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");
  return {
    ...originalModule,
    render: jest.fn((element, container) => {
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

jest.retryTimes(0, { logErrorsBeforeRetry: true });

configure({
  asyncUtilTimeout: 10000,
});

/** Antd mocks */
window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

Object.defineProperty(window, "TextEncoder", {
  writable: true,
  value: util.TextEncoder,
});
Object.defineProperty(window, "TextDecoder", {
  writable: true,
  value: util.TextDecoder,
});

window.scroll = jest.fn();
window.alert = jest.fn();

jest.setTimeout(20000);
