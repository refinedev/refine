import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";

import { MockJSONServer, TestWrapper, categories } from "@test";

import { useEditableTable } from "./useEditableTable";
import { act } from "react-dom/test-utils";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "categories", route: "categories" }],
    routerInitialEntries: ["/resources/categories"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/resources/:resource">{children}</Route>
    </Wrapper>
);
describe("useEditableTable Hook", () => {
    it("fetches table and form data", async () => {
        const { result, waitFor } = renderHook(() => useEditableTable({}), {
            wrapper: WrapperWithRoute,
        });

        await waitFor(() => {
            return !result.current.tableProps.loading;
        });

        const {
            tableProps: { dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(4);

        const exampleCategory = categories[0];

        act(() => {
            result.current.editButtonProps(exampleCategory.id).onClick();
        });

        await waitFor(() => {
            return !result.current.isLoading;
        });

        expect(result.current.form.getFieldValue("title")).toEqual(
            exampleCategory.title,
        );
    });
});
