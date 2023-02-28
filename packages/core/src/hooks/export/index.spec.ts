import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act } from "@test";
import { posts } from "@test/dataMocks";

import { useExport } from "./";

const generateCsvMock = jest.fn();

jest.mock("export-to-csv-fix-source-map", () => {
    return {
        ExportToCsv: class ExportToCsv {
            generateCsv = generateCsvMock;
        },
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("useExport Hook", () => {
    it("should render", () => {
        renderHook(() => useExport());
    });

    it("should trigger export correctly", async () => {
        const { result } = renderHook(() => useExport(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await act(async () => {
            await result.current.triggerExport();
        });

        expect(generateCsvMock).toBeCalledWith(posts);
    });

    it("should trigger export correctly with explicit resource configuration", async () => {
        const { result } = renderHook(
            () =>
                useExport({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.triggerExport();
        });

        expect(generateCsvMock).toBeCalledWith(posts);
    });

    it("should cut the amount of data to be exported when given maxItemCount", async () => {
        const { result } = renderHook(
            () =>
                useExport({
                    maxItemCount: 1,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.triggerExport();
        });

        expect(generateCsvMock).toBeCalledWith([posts[0]]);
    });

    it("should work with custom pageSize", async () => {
        const { result } = renderHook(
            () =>
                useExport({
                    pageSize: 1,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.triggerExport();
        });

        expect(generateCsvMock).toBeCalledWith(posts);
    });

    it("should work with custom mapData", async () => {
        const { result } = renderHook(
            () =>
                useExport({
                    mapData: (item) => ({
                        id: item.id,
                        title: item.title,
                    }),
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.triggerExport();
        });

        expect(generateCsvMock).toBeCalledWith(
            posts.map((post) => ({
                id: post.id,
                title: post.title,
            })),
        );
    });

    it("should handle getList throwing error", async () => {
        const onError = jest.fn();
        const { result } = renderHook(
            () =>
                useExport({
                    onError,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            getList: () => {
                                throw new Error("Error");
                            },
                        } as any,
                    },
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.triggerExport();
        });

        expect(result.current.isLoading).toEqual(false);
        expect(onError).toBeCalledWith(Error("Error"));

        expect(generateCsvMock).not.toBeCalled();
    });
});
