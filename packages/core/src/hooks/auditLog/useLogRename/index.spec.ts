import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useLogRename } from "./";

const logRenameMock = jest.fn();

describe("useLogRename Hook", () => {
    it("succeed rename", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useLogRename(), {
            wrapper: TestWrapper({
                auditLogProvider: {
                    rename: logRenameMock,
                },
            }),
        });

        const { mutate: rename } = result.current!;

        await rename({ id: 1, name: "test name" });

        await waitForNextUpdate();

        expect(logRenameMock).toBeCalledWith({ id: 1, name: "test name" });
        expect(logRenameMock).toBeCalledTimes(1);
    });
});
