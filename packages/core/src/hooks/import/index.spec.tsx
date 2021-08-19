import { UploadFile } from "antd/lib/upload/interface";
import { TestWrapper, MockJSONServer } from "@test";
import { renderHook } from "@testing-library/react-hooks";
import * as papaparse from "papaparse";

import { useImport } from ".";
import { parse } from "qs";

jest.mock("papaparse", () => {
    return {
        parse: jest.fn(jest.requireActual("papaparse").parse),
    };
});

const useCreateMutateMock = jest.fn();
const useCreateManyMutateMock = jest.fn();

jest.mock("@hooks/data", () => ({
    ...jest.requireActual("@hooks/data"),
    useCreate: jest.fn(() => ({
        mutate: useCreateMutateMock,
    })),
    useCreateMany: jest.fn(() => ({
        mutate: useCreateManyMutateMock,
    })),
}));

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

    it("should trigger parse", async () => {
        const { result } = renderHook(() => useImport(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result.current.uploadProps.onChange?.({
            fileList: [],
            file: file as unknown as UploadFile,
        });

        expect(papaparse.parse).toHaveBeenCalled();
    });

    it("should call mutate method of result of useCreateMany one time with correct values if batchSize is null", (done) => {
        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: null,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.uploadProps.onChange?.({
            fileList: [],
            file: file as unknown as UploadFile,
        });

        setTimeout(() => {
            expect(useCreateManyMutateMock).toHaveBeenCalledWith({
                resource: "posts",
                values: parsedData.map((parsedData) => ({
                    ...parsedData,
                })),
            });
            done();
        }, 4000);
    });

    it("should call mutate method of result of useCreate many times with correct values if batchSize is 1", (done) => {
        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: 1,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.uploadProps.onChange?.({
            fileList: [],
            file: file as unknown as UploadFile,
        });

        setTimeout(() => {
            expect(useCreateMutateMock).toHaveBeenCalledWith({
                resource: "posts",
                values: parsedData[0],
            });
            expect(useCreateMutateMock).toHaveBeenCalledWith({
                resource: "posts",
                values: parsedData[1],
            });
            expect(useCreateMutateMock).toHaveBeenCalledWith({
                resource: "posts",
                values: parsedData[2],
            });
            done();
        }, 4000);
    });

    it("should call mutate method of result of useCreateMany many times with correct values in if batchSize is 2", (done) => {
        const { result } = renderHook(
            () =>
                useImport({
                    batchSize: 2,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.uploadProps.onChange?.({
            fileList: [],
            file: file as unknown as UploadFile,
        });

        setTimeout(() => {
            expect(useCreateManyMutateMock).toHaveBeenCalledWith({
                resource: "posts",
                values: parsedData.slice(0, 2).map((parsedData) => ({
                    ...parsedData,
                })),
                successNotification: undefined,
                errorNotification: undefined,
            });

            expect(useCreateManyMutateMock).toHaveBeenCalledWith({
                resource: "posts",
                values: parsedData.slice(2).map((parsedData) => ({
                    ...parsedData,
                })),
                successNotification: undefined,
                errorNotification: undefined,
            });

            done();
        }, 4000);
    });
});
