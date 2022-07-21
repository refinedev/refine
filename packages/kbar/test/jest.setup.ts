import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
// import { createMockServer } from "./dataMocks";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = TextDecoder;

window.scroll = jest.fn();
window.alert = jest.fn();

/** mock service worker setup */
// const server = createMockServer();

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
