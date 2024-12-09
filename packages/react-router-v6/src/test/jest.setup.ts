import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "@testing-library/dom";

jest.retryTimes(3, { logErrorsBeforeRetry: true });

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

window.scroll = jest.fn();
window.alert = jest.fn();

jest.setTimeout(20000);
