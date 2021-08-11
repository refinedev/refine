import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";
import { posts } from "@test/dataMocks";

import { useEditableTable } from "./useEditableTable";
import { act } from "react-dom/test-utils";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "categories", route: "categories" }],
    routerInitialEntries: ["/categories"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/:resource">{children}</Route>
    </Wrapper>
);
describe("useEditableTable Hook", () => {
    it("fetches table and form data", async () => {
        const { result, waitFor } = renderHook(() => useEditableTable(), {
            wrapper: WrapperWithRoute,
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

        expect(result.current.form.getFieldValue("title")).toEqual(
            examplePost.title,
        );
    });
});
