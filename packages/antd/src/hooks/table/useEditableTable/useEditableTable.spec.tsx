import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test";
import { posts } from "@test/dataMocks";

import { useEditableTable } from "./useEditableTable";
import { act } from "react-dom/test-utils";

describe("useEditableTable Hook", () => {
    beforeAll(() => {
        jest.spyOn(console, "error").mockImplementation(jest.fn());
    });
    it("fetches table and form data", async () => {
        const { result } = renderHook(() => useEditableTable(), {
            wrapper: TestWrapper({}),
        });

        await waitFor(() => {
            expect(!result.current.tableProps.loading).toBeTruthy();
        });

        const {
            tableProps: { dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);

        const examplePost = posts[0];

        act(() => {
            result.current.editButtonProps(examplePost.id).onClick();
        });

        await waitFor(() => {
            expect(!result.current.formLoading).toBeTruthy();
        });

        expect(result.current.formProps.initialValues?.title).toEqual(
            examplePost.title,
        );
    });
});
