import { RcFile, UploadFile } from "antd/lib/upload/interface";
import { TestWrapper, MockJSONServer } from "@test";
import { renderHook } from "@testing-library/react-hooks";
import * as papaparse from "papaparse";

import { useImport } from ".";
import { act } from "react-dom/test-utils";
import { IDataContext } from "src/interfaces";

jest.mock("papaparse", () => {
    return {
        parse: jest.fn(jest.requireActual("papaparse").parse),
    };
});

const file = new File(
    [
        `"id","title","createdAt","updatedAt"
"35ad97dd-9379-480a-b6ac-6fc9c13e9224","Viral Strategist Local","2021-04-09T12:03:23.933Z","2021-04-09T12:03:23.933Z"
"9a428977-1b03-4c3e-8cdd-1e4e2813528a","Concrete Soap Neural","2021-04-09T12:03:23.835Z","2021-04-09T12:03:23.835Z"
"1a428977-1b03-4c3e-8cdd-1e4e281e9224","Strategist Soap Viral","2021-03-09T12:12:23.933Z","2021-03-09T12:12:23.933Z"`,
    ],
    "data.csv",
    { type: "text/csv" },
);

const parsedData = [
    {
        id: "35ad97dd-9379-480a-b6ac-6fc9c13e9224",
        title: "Viral Strategist Local",
        createdAt: "2021-04-09T12:03:23.933Z",
        updatedAt: "2021-04-09T12:03:23.933Z",
    },
    {
        id: "9a428977-1b03-4c3e-8cdd-1e4e2813528a",
        title: "Concrete Soap Neural",
        createdAt: "2021-04-09T12:03:23.835Z",
        updatedAt: "2021-04-09T12:03:23.835Z",
    },
    {
        id: "1a428977-1b03-4c3e-8cdd-1e4e281e9224",
        title: "Strategist Soap Viral",
        createdAt: "2021-03-09T12:12:23.933Z",
        updatedAt: "2021-03-09T12:12:23.933Z",
    },
];

afterEach(() => {
    jest.clearAllMocks();
});

describe("useImport hook", () => {
    it("should render hook without crashing", () => {
        const result = renderHook(() => useImport(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result).toBeTruthy();
    });

    it("should trigger parse", async (done) => {
        const { result } = renderHook(
            () =>
                useImport({
                    onFinished: () => {
                        expect(papaparse.parse).toHaveBeenCalled();
                        done();
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.uploadProps.onChange?.({
                fileList: [],
                file: file as unknown as UploadFile,
            });
        });
    });

    it("should call mutate method of result of useCreateMany one time with correct values if batchSize=null", async (done) => {
        const mockDataProvider = {
            ...MockJSONServer,
            createMany: jest.fn(async () => {
                return {
                    data: parsedData,
                };
            }),
        } as IDataContext;

        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: null,
                    onFinished: () => {
                        expect(
                            mockDataProvider.createMany,
                        ).toHaveBeenCalledWith("posts", parsedData);
                        done();
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: mockDataProvider,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.uploadProps.onChange?.({
                fileList: [],
                file: file as unknown as UploadFile,
            });
        });
    });

    it("should call mutate method of result of useCreate many times with correct values if batchSize is 1", async (done) => {
        const mockDataProvider = {
            ...MockJSONServer,
            create: jest.fn(async () => {
                return {
                    data: parsedData[0],
                };
            }),
        } as IDataContext;

        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: 1,
                    onFinished: () => {
                        expect(mockDataProvider.create).toHaveBeenCalledWith(
                            "posts",
                            parsedData[0],
                        );
                        expect(mockDataProvider.create).toHaveBeenCalledWith(
                            "posts",
                            parsedData[1],
                        );
                        expect(mockDataProvider.create).toHaveBeenCalledWith(
                            "posts",
                            parsedData[2],
                        );
                        done();
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: mockDataProvider,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.uploadProps.onChange?.({
                fileList: [],
                file: file as unknown as UploadFile,
            });
        });
    });

    // fit("should call mutate method of result of useCreateMany many times with correct values in if batchSize is 2", async (done) => {
    //     const { result } = renderHook(
    //         () =>
    //             useImport({
    //                 batchSize: 2,
    //                 onFinished: () => {
    //                     expect(useCreateManyMutateMock).toHaveBeenCalledWith({
    //                         resource: "posts",
    //                         values: parsedData
    //                             .slice(0, 2)
    //                             .map((parsedData) => ({
    //                                 ...parsedData,
    //                             })),
    //                         successNotification: undefined,
    //                         errorNotification: undefined,
    //                     });

    //                     expect(useCreateManyMutateMock).toHaveBeenCalledWith({
    //                         resource: "posts",
    //                         values: parsedData.slice(2).map((parsedData) => ({
    //                             ...parsedData,
    //                         })),
    //                         successNotification: undefined,
    //                         errorNotification: undefined,
    //                     });

    //                     done();
    //                 },
    //             }),
    //         {
    //             wrapper: TestWrapper({
    //                 dataProvider: MockJSONServer,
    //                 resources: [{ name: "posts" }],
    //             }),
    //         },
    //     );

    //     await act(async () => {
    //         await result.current.uploadProps.onChange?.({
    //             fileList: [],
    //             file: file as unknown as UploadFile,
    //         });
    //     });
    // });

    /* it("should map data successfully before it uploads to server", async (done) => {
        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: null,
                    mapData: (data) => ({
                        id: data.id,
                        newTitle: data.title,
                    }),
                    onFinished: () => {
                        expect(useCreateManyMutateMock).toHaveBeenCalledWith({
                            resource: "posts",
                            values: parsedData.map((parsedData) => ({
                                id: parsedData.id,
                                newTitle: parsedData.title,
                            })),
                        });
                        done();
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await act(async () => {
            await result.current.uploadProps.onChange?.({
                fileList: [],
                file: file as unknown as UploadFile,
            });
        });

        // setTimeout(() => {
        //     expect(useCreateManyMutateMock).toHaveBeenCalledWith({
        //         resource: "posts",
        //         values: parsedData.map((parsedData) => ({
        //             id: parsedData.id,
        //             newTitle: parsedData.title,
        //         })),
        //     });
        //     done();
        // }, 4000);
    }); */

    /* it("should send request for the specified resource", async (done) => {
        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: null,
                    resourceName: "tests",
                    onFinished: () => {
                        expect(useCreateManyMutateMock).toHaveBeenCalledWith({
                            resource: "tests",
                            values: parsedData.map((parsedData) => ({
                                ...parsedData,
                            })),
                        });
                        done();
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        // result.current.uploadProps.onChange?.({
        //     fileList: [],
        //     file: file as unknown as UploadFile,
        // });

        await act(async () => {
            await result.current.uploadProps.onChange?.({
                fileList: [],
                file: file as unknown as UploadFile,
            });
        });

        // setTimeout(() => {
        //     expect(useCreateManyMutateMock).toHaveBeenCalledWith({
        //         resource: "tests",
        //         values: parsedData.map((parsedData) => ({
        //             ...parsedData,
        //         })),
        //     });
        //     done();
        // }, 4000);
    }); */

    /* it("should return false from uploadProps.beforeUpload callback", () => {
        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: null,
                    resourceName: "tests",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        const beforeUploadResult = result.current.uploadProps.beforeUpload?.(
            file as unknown as RcFile,
            [],
        );

        expect(beforeUploadResult).toBe(false);
    }); */
});
