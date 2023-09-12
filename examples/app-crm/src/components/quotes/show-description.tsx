import { HttpError } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { useForm } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Quote, QuoteUpdateInput } from "../../interfaces/graphql";
import { Form, Spin } from "antd";

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
            fields: ["id", "description"],
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
                    <Form.Item noStyle name="description">
                        <MDEditor
                            preview="edit"
                            data-color-mode="light"
                            height={250}
                        />
                    </Form.Item>
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
