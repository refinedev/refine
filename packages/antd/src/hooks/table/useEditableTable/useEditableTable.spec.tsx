import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";
import { posts } from "@test/dataMocks";

import { useEditableTable } from "./useEditableTable";
import { act } from "react-dom/test-utils";

describe("useEditableTable Hook", () => {
    it("fetches table and form data", async () => {
        const { result, waitFor } = renderHook(() => useEditableTable(), {
            wrapper: TestWrapper({}),
        });

        await waitFor(() => {
            return !result.current.tableProps.loading;
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
            return !result.current.formLoading;
        });

        expect(result.current.formProps.initialValues?.title).toEqual(
            examplePost.title,
        );
    });
});
