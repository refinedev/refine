import { Form, FormProps, Input, InputNumber, Modal, ModalProps } from "antd";

type EditMissionProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const EditMission: React.FC<EditMissionProps> = ({
    modalProps,
    formProps,
}) => {
    return (
        <Modal
            {...modalProps}
            title="Edit Mission"
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
