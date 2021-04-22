import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useCheckboxGroup } from "./";

describe("render hook default options", () => {
    it("should success data without default values", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useCheckboxGroup({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.queryResult.isSuccess;
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
    });

    it("should success data with default values", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useCheckboxGroup({
                    resource: "posts",
                    defaultValue: ["1", "2", "3", "4"],
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.queryResult.isSuccess;
        });

        const { options } = result.current;

        expect(options).toHaveLength(4);
    });
});
