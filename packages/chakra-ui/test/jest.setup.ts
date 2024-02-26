import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import * as util from "util";

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

window.scroll = jest.fn();
window.alert = jest.fn();

Object.defineProperty(window, "TextEncoder", {
  writable: true,
  value: util.TextEncoder,
});
Object.defineProperty(window, "TextDecoder", {
  writable: true,
  value: util.TextDecoder,
});

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;
