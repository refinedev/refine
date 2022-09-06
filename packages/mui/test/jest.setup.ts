import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "@testing-library/dom";
import * as util from "util";
// import { createMockServer } from "./dataMocks";

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

/** mock service worker setup */
// const server = createMockServer();

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

Object.defineProperty(window, "TextEncoder", {
    writable: true,
    value: util.TextEncoder,
});
Object.defineProperty(window, "TextDecoder", {
    writable: true,
    value: util.TextDecoder,
});

jest.setTimeout(20000);
