import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
// import { createMockServer } from "./dataMocks";

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
