import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import * as util from "util";

if (process.env.CI) {
  jest.retryTimes(3, { logErrorsBeforeRetry: true });
}

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
