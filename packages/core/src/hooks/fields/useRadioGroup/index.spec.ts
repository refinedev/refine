import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useRadioGroup } from "./";

describe("render hook default options", () => {
    it("should success data without default values", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useRadioGroup({
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

        const { radioProps } = result.current;
        const { options } = radioProps;

        expect(options).toHaveLength(2);
    });

    it("should success data with default values", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useRadioGroup({
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

        const { radioProps } = result.current;
        const { options } = radioProps;

        expect(options).toHaveLength(4);
    });
});
