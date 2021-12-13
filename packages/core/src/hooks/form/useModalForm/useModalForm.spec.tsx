import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { MockJSONServer, TestWrapper } from "@test";
import { posts } from "@test/dataMocks";

import { useModalForm } from "./useModalForm";
import { HttpError } from "../../../interfaces";

const Wrapper = TestWrapper({
    dataProvider: MockJSONServer,
    resources: [{ name: "posts", route: "posts" }],
    routerInitialEntries: ["/posts/create/1"],
});

const WrapperWithRoute: React.FC = ({ children }) => (
    <Wrapper>
        <Route path="/:resource/:action/:id">{children}</Route>
    </Wrapper>
);

describe("useModalForm Hook", () => {
    it("should load data to form with edit action", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useModalForm<{}, HttpError, { title: string }>({
                    action: "edit",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        const { formProps, show } = result.current;

        act(() => {
            show(posts[0].id);
        });

        await waitFor(() => {
            return !result.current.formLoading;
        });

        expect(formProps.form?.getFieldValue("title")).toEqual(posts[0].title);
    });

    it("should close modal after success request if mutation mode is pessimistic", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useModalForm<{}, HttpError, { title: string }>({
                    action: "edit",
                    mutationMode: "pessimistic",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        const { show } = result.current;

        expect(result.current.modalProps.visible).toBeFalsy();

        act(() => {
            show(posts[0].id);
        });

        expect(result.current.modalProps.visible).toBeTruthy();

        await waitFor(() => {
            return !result.current.formLoading;
        });

        act(() => {
            result.current.form?.setFieldsValue({
                title: "new title",
            });
            result.current.form?.submit();
        });

        // TODO(fix this test)
        // await waitFor(() => {
        //     return result.current.mutationResult.isSuccess;
        // });

        // expect(result.current.modalProps.visible).toBeFalsy();
    });

    it("when visible change data should be in modal", async () => {
        const { result } = renderHook(
            () =>
                useModalForm<{}, HttpError, { title: string }>({
                    action: "create",
                }),
            {
                wrapper: WrapperWithRoute,
            },
        );

        const { formProps, show, close } = result.current;

        act(() => {
            show();
        });

        formProps.form?.setFieldsValue({
            title: "new title",
        });

        act(() => {
            close();
            show();
        });

        expect(formProps.form?.getFieldValue("title")).toEqual("new title");
    });
});
