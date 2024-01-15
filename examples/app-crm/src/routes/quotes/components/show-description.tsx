import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { Form, Spin } from "antd";

import { Quote, QuoteUpdateInput } from "@/graphql/schema.types";

import { QUOTES_UPDATE_QUOTE_MUTATION } from "../queries";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

export const ShowDescription = () => {
    const params = useParams<{ id: string }>();

    const { formProps, queryResult, autoSaveProps } = useForm<
        Quote,
        HttpError,
        QuoteUpdateInput
    >({
        resource: "quotes",
        action: "edit",
        id: params.id,
        redirect: false,
        liveMode: "off",
        warnWhenUnsavedChanges: false,
        autoSave: {
            enabled: true,
        },
        invalidates: [],
        meta: {
            gqlMutation: QUOTES_UPDATE_QUOTE_MUTATION,
        },
    });

    const formLoading = queryResult?.isLoading ?? false;

    return (
        <Spin spinning={formLoading}>
            <div
                style={{
                    position: "relative",
                    padding: "0 24px 24px 24px",
                }}
            >
                <Form {...formProps}>
                    <Suspense>
                        <Form.Item noStyle name="description">
                            <MDEditor
                                preview="edit"
                                data-color-mode="light"
                                height={250}
                            />
                        </Form.Item>
                    </Suspense>
                </Form>
                <div>
                    <Spin
                        style={{
                            position: "absolute",
                            bottom: "32px",
                            right: "32px",
                        }}
                        spinning={autoSaveProps?.status === "loading" ?? true}
                    />
                </div>
            </div>
        </Spin>
    );
};
