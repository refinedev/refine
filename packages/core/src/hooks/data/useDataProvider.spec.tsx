import { renderHook } from "@testing-library/react-hooks";
import ReactRouterDom from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";

import { useDataProvider } from ".";

const mHistory = {
    push: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("useDataProvider Hook", () => {
    const { result } = renderHook(() => useDataProvider(), {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
        }),
    });

    it("get list", async () => {
        const dataProvider = result.current();
        expect(dataProvider.getList).toBeDefined();
    });
});
