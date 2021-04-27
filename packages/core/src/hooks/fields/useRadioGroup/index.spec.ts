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

        const { radioGroupProps } = result.current;
        const { options } = radioGroupProps;

        expect(options).toHaveLength(2);
    });

    it("should successfully fetch data by default", async () => {
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

        const { radioGroupProps } = result.current;
        const { options } = radioGroupProps;

        expect(options).toHaveLength(2);
    });
});
