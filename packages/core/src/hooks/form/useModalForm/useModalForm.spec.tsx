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

    it("should close modal before request success when mutation mode pessimistic", async () => {
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

        const { formProps, modalProps, show, formLoading } = result.current;

        act(() => {
            show(posts[0].id);
        });

        await waitFor(() => {
            return !formLoading;
        });

        act(() => {
            formProps.form?.setFieldsValue({
                title: "new title",
            });
            formProps.form?.submit();
        });

        expect(modalProps.visible).toBeFalsy();
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
