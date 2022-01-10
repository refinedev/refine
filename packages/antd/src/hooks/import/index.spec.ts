import { RcFile } from "antd/lib/upload/interface";
import { TestWrapper, MockJSONServer } from "@test";
import { renderHook } from "@testing-library/react-hooks";

import { useImport } from ".";
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

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

describe("useImport hook", () => {
    it("should return false from uploadProps.beforeUpload callback", () => {
        const { result } = renderHook(
            () =>
                useImport({
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
    });
});
