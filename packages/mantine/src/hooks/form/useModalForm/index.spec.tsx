import { useModalForm } from "..";
import { MockJSONServer, TestWrapper, waitFor, renderHook, act } from "@test";

describe("useModalForm hook", () => {
    it("should `meta[syncWithLocationKey]` overrided by default", async () => {
        const mockGetOne = jest.fn();
        const mockUpdate = jest.fn();

        const { result } = renderHook(
            () =>
                useModalForm({
                    syncWithLocation: true,
                    refineCoreProps: {
                        id: 5,
                        action: "edit",
                        resource: "posts",
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        ...MockJSONServer,
                        getOne: mockGetOne,
                        update: mockUpdate,
                    },
                }),
            },
        );

        await act(async () => {
            result.current.modal.show();
        });

        await waitFor(() => expect(result.current.modal.visible).toBe(true));

        await waitFor(() => expect(mockGetOne.mock.calls.length).toBe(1));
        expect(mockGetOne.mock.calls[0][0].meta?.["modal-posts-edit"]).toBe(
            undefined,
        );
    });
});
