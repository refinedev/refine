import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from "util";
// import { createMockServer } from "./dataMocks";

global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = TextDecoder;

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
