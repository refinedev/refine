import React from "react";
import {
    Checkbox,
    Form,
    FormProps,
    Input,
    DatePicker,
    Row,
    Col,
    Select,
    ColorPicker,
    FormInstance,
} from "antd";
import { useSelect } from "@refinedev/antd";

type CalendarFormProps = {
    isAllDayEvent: boolean;
    setIsAllDayEvent: (value: boolean) => void;
    formProps: FormProps;
    form: FormInstance;
};

const { RangePicker } = DatePicker;

export const CalendarForm: React.FC<CalendarFormProps> = ({
    form,
    formProps,
    isAllDayEvent = false,
    setIsAllDayEvent,
}) => {
    const { selectProps: categorySelectProps } = useSelect({
        resource: "eventCategories",
        meta: {
            fields: ["id", "title"],
        },
    });

    const { selectProps: userSelectProps } = useSelect({
        optionLabel: "name",
        resource: "users",
        meta: {
            fields: ["id", "name"],
        },
    });

    return (
        <Form layout="vertical" form={form} {...formProps}>
            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="Date & Time"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Checkbox
                        checked={isAllDayEvent}
                        onChange={(e) => setIsAllDayEvent(e.target.checked)}
                        style={{ width: 120 }}
                    >
                        All Day
                    </Checkbox>
                    <Form.Item
                        name="date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        noStyle
                    >
                        <RangePicker
                            style={{ width: "100%", backgroundColor: "#fff" }}
                            showTime={!isAllDayEvent}
                            format={
                                isAllDayEvent
                                    ? "YYYY/MM/DD"
                                    : "YYYY/MM/DD HH:mm"
                            }
                        />
                    </Form.Item>
                </div>
            </Form.Item>
            <Row gutter={[32, 32]}>
                <Col span={12}>
                    <Form.Item
                        label="Category"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select {...categorySelectProps} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Color"
                        name="color"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        initialValue={"#1677FF"}
                    >
                        <ColorPicker
                            defaultValue="#1677FF"
                            panelRender={(_, { components: { Presets } }) => (
                                <Presets />
                            )}
                            presets={[
                                {
                                    label: "Recommended",
                                    colors: [
                                        "#F5222D",
                                        "#FA8C16",
                                        "#FADB14",
                                        "#8BBB11",
                                        "#52C41A",
                                        "#13A8A8",
                                        "#1677FF",
                                        "#2F54EB",
                                        "#722ED1",
                                        "#EB2F96",
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Invite participants"
                name="participantIds"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select mode="multiple" allowClear {...userSelectProps} />
            </Form.Item>
        </Form>
    );
};
