import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useResource } from "./";

describe("useResource Hook", () => {
    it("returns context value", async () => {
        const { result } = renderHook(() => useResource(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result.current.resources).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "posts" }),
            ]),
        );
    });

    it("should successfully return options value", async () => {
        const { result } = renderHook(() => useResource(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [
                    {
                        name: "posts",
                        options: {
                            isThatReallyWork: true,
                        },
                    },
                ],
            }),
        });

        expect(result.current.resources).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    options: {
                        isThatReallyWork: true,
                    },
                }),
            ]),
        );
    });
});
