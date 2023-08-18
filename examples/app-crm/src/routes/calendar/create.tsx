import React from "react";
import {
    Checkbox,
    Col,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";
import { useForm, useSelect } from "@refinedev/antd";

import { Event } from "../../interfaces/graphql";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const CalendarCreatePage = () => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const [isAllDayEvent, setIsAllDayEvent] = React.useState(false);
    const { formProps, saveButtonProps, form, onFinish } = useForm<Event>({
        resource: "events",
        queryOptions: {
            enabled: false,
        },
        mutationMeta: {
            operation: "createOneEvent",
        },
    });
    const { selectProps: categorySelectProps } = useSelect({
        resource: "eventCategories",
        meta: {
            operation: "getEventCategories",
            fields: ["id", "title"],
        },
    });

    const { selectProps: userSelectProps } = useSelect({
        optionLabel: "name",
        resource: "users",
        meta: {
            operation: "getUsers",
            fields: ["id", "name"],
        },
    });

    const handleOnFinish = async (values: any) => {
        const { date, ...otherValues } = values;

        let startDate = dayjs.utc(date[0]);
        let endDate = dayjs.utc(date[1]);

        if (isAllDayEvent) {
            startDate = startDate.startOf("day");
            endDate = endDate.endOf("day");
        }

        await onFinish({
            ...otherValues,
            startDate: startDate.utc().toISOString(),
            endDate: endDate.utc().toISOString(),
        });
    };

    return (
        <Modal
            title="Create Event"
            open
            onCancel={() => {
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            okButtonProps={{
                ...saveButtonProps,
            }}
        >
            <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
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
                                style={{ width: "100%" }}
                                showTime={!isAllDayEvent}
                                format={
                                    isAllDayEvent
                                        ? "YYYY/MM/DD"
                                        : "YYYY/MM/DD HH:mm:ss"
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
                            initialValue={"#000000"}
                        >
                            <Input hidden />
                            <Form.Item noStyle>
                                <ColorPicker
                                    defaultValue="#000000"
                                    onChangeComplete={(value) => {
                                        return form.setFieldValue(
                                            "color",
                                            `#${value.toHex()}`,
                                        );
                                    }}
                                />
                            </Form.Item>
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
        </Modal>
    );
};
