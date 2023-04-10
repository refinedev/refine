import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act } from "@test";

import { useSiderVisible } from "./";

describe("useSiderVisible Hook", () => {
    describe("siderVisible", () => {
        it("should visible undefined on init", async () => {
            const { result } = renderHook(() => useSiderVisible(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                }),
            });

            expect(result.current.siderVisible).toBeUndefined();
        });

        it("should visible true on called setSiderVisible", async () => {
            const { result } = renderHook(() => useSiderVisible(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                }),
            });

            act(() => {
                result.current.setSiderVisible?.(true);
            });

            waitFor(() => {
                expect(result.current.siderVisible).toBeTruthy();
            });
        });
    });

    describe("drawerSiderVisible", () => {
        it("should visible undefined on init", async () => {
            const { result } = renderHook(() => useSiderVisible(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                }),
            });

            expect(result.current.drawerSiderVisible).toBeUndefined;
        });

        it("should visible true on called setDrawerSiderVisible", async () => {
            const { result } = renderHook(() => useSiderVisible(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                }),
            });

            act(() => {
                result.current.setDrawerSiderVisible?.(true);
            });

            waitFor(() => {
                expect(result.current.drawerSiderVisible).toBeTruthy();
            });
        });
    });
});
