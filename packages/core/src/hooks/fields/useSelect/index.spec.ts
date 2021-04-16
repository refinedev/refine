import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useSelect } from "./";

describe("useSelect Hook", () => {
    it("default", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect({
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
            return !result.current.queryResult?.isLoading;
        });

        const { options } = result.current;

        expect(options).toHaveLength(0);
    });

    it("defaultValue", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: ["1", "2"],
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.queryResult.isLoading;
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
    });
});
