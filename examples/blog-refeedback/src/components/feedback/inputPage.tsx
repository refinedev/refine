import { useForm } from "@refinedev/antd";

import { Button, Form, Input } from "antd";

import { IFeedback } from "interfaces";

export type FeedBackCardInputProps = {
    selectedType: string;
    handleVisibleCard: () => void;
};

export const InputPage: React.FC<FeedBackCardInputProps> = ({
    selectedType,
    handleVisibleCard,
}) => {
    const { formProps, saveButtonProps, form } = useForm<IFeedback>({
        action: "create",
        resource: "feedbacks",
        redirect: false,
    });

    return (
        <Form
            {...formProps}
            onFinish={(values) => {
                formProps.onFinish?.({
                    ...values,
                    type: selectedType,
                    page: window.location.href,
                });
                handleVisibleCard();
            }}
        >
            <Form.Item
                noStyle
                name="description"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.TextArea
                    autoFocus
                    placeholder="I notice that..."
                    autoSize={{ minRows: 3, maxRows: 3 }}
                />
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
                {() => (
                    <Button
                        style={{ marginTop: "8px" }}
                        block
                        type="primary"
                        {...saveButtonProps}
                        disabled={
                            (form.getFieldValue("description") ?? "").length ===
                            0
                        }
                    >
                        Send feedback
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};
