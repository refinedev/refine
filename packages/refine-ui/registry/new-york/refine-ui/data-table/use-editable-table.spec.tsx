import { renderHook, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";
import { type BaseRecord } from "@refinedev/core";
import { useEditableTable } from "./use-editable-table";

// Mocking @refinedev/core and other dependencies since we don't have a full test environment in refine-ui
vi.mock("@refinedev/core", async () => {
    const actual = await vi.importActual("@refinedev/core");
    return {
        ...actual,
        useUpdate: () => ({
            mutateAsync: vi.fn().mockResolvedValue({}),
        }),
    };
});

vi.mock("@refinedev/react-table", () => ({
    useTable: vi.fn().mockReturnValue({
        tableQuery: { data: { data: [] }, isLoading: false },
    }),
}));

vi.mock("@refinedev/react-hook-form", () => ({
    useForm: vi.fn().mockReturnValue({
        refineCore: {
            id: undefined,
            setId: vi.fn(),
            onFinish: vi.fn().mockResolvedValue({}),
        },
        reset: vi.fn(),
        getValues: vi.fn().mockReturnValue({ title: "Updated Title" }),
        handleSubmit: (cb: any) => () => cb({ title: "Updated Title" }),
    }),
}));

describe("useEditableTable", () => {
    it("should initialize correctly", () => {
        const { result } = renderHook(() => useEditableTable());

        expect(result.current.isEditing("1")).toBe(false);
    });

    it("should set editing state when edit is called", async () => {
        const { result } = renderHook(() => useEditableTable());
        const mockRecord = { id: "1", title: "Test Post" };

        act(() => {
            result.current.edit("1", mockRecord);
        });

        // Since we mocked useForm, we need to check if setId was called
        const { useForm } = await import("@refinedev/react-hook-form");
        const formMock = (useForm as any).mock.results[0].value;

        expect(formMock.refineCore.setId).toHaveBeenCalledWith("1");
        expect(formMock.reset).toHaveBeenCalledWith(mockRecord);
    });

    it("should call onFinish and reset when save is called", async () => {
        const { result } = renderHook(() => useEditableTable());

        act(() => {
            result.current.edit("1", { id: "1", title: "Test Post" } as any);
        });

        await act(async () => {
            await result.current.save();
        });

        const { useForm } = await import("@refinedev/react-hook-form");
        const formMock = (useForm as any).mock.results[0].value;

        expect(formMock.refineCore.onFinish).toHaveBeenCalled();
        expect(formMock.refineCore.setId).toHaveBeenCalledWith(undefined);
    });

    it("should reset state when cancel is called", async () => {
        const { result } = renderHook(() => useEditableTable());

        act(() => {
            result.current.edit("1");
        });

        act(() => {
            result.current.cancel();
        });

        const { useForm } = await import("@refinedev/react-hook-form");
        const formMock = (useForm as any).mock.results[0].value;

        expect(formMock.refineCore.setId).toHaveBeenCalledWith(undefined);
    });
});
