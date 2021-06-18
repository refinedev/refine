import { UploadFile } from "antd/lib/upload/interface";
import { TestWrapper, MockJSONServer } from "@test";
import { renderHook } from "@testing-library/react-hooks";

import { useImport } from ".";

const parseMock = jest.fn();

jest.mock("papaparse", () => {
    return {
        parse: jest.fn(() => parseMock()),
    };
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
        // const { container } = customRender(<ImportButton>Test</ImportButton>);
        const { result } = renderHook(() => useImport(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        const file = new File(
            [
                `"id","title","createdAt","updatedAt"
"35ad97dd-9379-480a-b6ac-6fc9c13e9224","Viral Strategist Local","2021-04-09T12:03:23.933Z","2021-04-09T12:03:23.933Z"
"9a428977-1b03-4c3e-8cdd-1e4e2813528a","Concrete Soap Neural","2021-04-09T12:03:23.835Z","2021-04-09T12:03:23.835Z"`,
            ],
            "data.csv",
            { type: "text/csv" },
        );

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result.current.uploadProps.onChange!({
            fileList: [],
            file: file as unknown as UploadFile,
        });

        expect(parseMock).toHaveBeenCalled();
    });
});
