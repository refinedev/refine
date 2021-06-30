import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper, act } from "@test";

import { useExport } from "./";

jest.mock("export-to-csv", () => {
    return {
        ExportToCsv: class ExportToCsv {},
    };
});

describe("useExport Hook", () => {
    it("should render", () => {
        renderHook(() => useExport());
    });

    // it("should export correctly", async () => {
    //     window.open = jest.fn();

    //     const { result } = renderHook(() => useExport(), {
    //         wrapper: TestWrapper({
    //             dataProvider: MockJSONServer,
    //             resources: [{ name: "posts" }],
    //         }),
    //     });

    //     await result.current.onClick();

    //     expect(window.open).toBeCalled();
    // });
});
