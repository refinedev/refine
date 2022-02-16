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
            dataProvider: {
                default: MockJSONServer.default,
                another: MockJSONServer.default,
            },
        }),
    });

    it("get list with default data provider", async () => {
        const dataProvider = result.current();
        expect(dataProvider.getList).toBeDefined();
    });

    it("get list with fron another data provider", async () => {
        const dataProvider = result.current("another");

        expect(dataProvider.getList).toBeDefined();
    });

    it("get list with fron another data provider", async () => {
        try {
            result.current("not-exist");
        } catch (error) {
            expect(error).toEqual(
                new Error(`"not-exist" Data provider not found`),
            );
        }
    });
});
