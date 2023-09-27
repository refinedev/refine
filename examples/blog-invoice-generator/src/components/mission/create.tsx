import { Form, FormProps, Input, InputNumber, Modal, ModalProps } from "antd";

type CreateMissionProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const CreateMission: React.FC<CreateMissionProps> = ({
    modalProps,
    formProps,
}) => {
    return (
        <Modal
            {...modalProps}
            title="Create Mission"
            style={{
                padding: "0 80px",
            }}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="mission"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="mission_description">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Day(s)"
                    name="day"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber defaultValue={0} />
                </Form.Item>
                <Form.Item
                    label="Daily Rate"
                    name="daily_rate"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber defaultValue={0} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
