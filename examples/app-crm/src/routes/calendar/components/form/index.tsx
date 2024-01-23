import React from "react";

import { useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
    Checkbox,
    Col,
    ColorPicker,
    DatePicker,
    Form,
    FormInstance,
    FormProps,
    Input,
    Row,
    Select,
    TimePicker,
} from "antd";
import dayjs from "dayjs";

import { EVENT_CATEGORIES_QUERY } from "@/graphql/queries";
import { EventCategoriesQuery } from "@/graphql/types";
import { useUsersSelect } from "@/hooks/useUsersSelect";

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
    const { selectProps: categorySelectProps } = useSelect<
        GetFieldsFromList<EventCategoriesQuery>
    >({
        resource: "eventCategories",
        meta: {
            gqlQuery: EVENT_CATEGORIES_QUERY,
        },
    });

    const { selectProps: userSelectProps } = useUsersSelect();

    const rangeDate = form.getFieldsValue().rangeDate;
    const date = form.getFieldsValue().date;

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
                    <div style={{ flex: 1, width: 80 }}>
                        <Checkbox
                            checked={isAllDayEvent}
                            onChange={(e) => setIsAllDayEvent(e.target.checked)}
                        >
                            All Day
                        </Checkbox>
                    </div>

                    {isAllDayEvent ? (
                        <Form.Item
                            name="rangeDate"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            noStyle
                        >
                            <RangePicker
                                style={{
                                    width: 416,
                                }}
                                format={"YYYY/MM/DD"}
                                defaultValue={[dayjs(date), dayjs(date)]}
                            />
                        </Form.Item>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "0.5rem",
                            }}
                        >
                            <Form.Item
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                noStyle
                            >
                                <DatePicker
                                    style={{
                                        width: "160px",
                                    }}
                                    format={"YYYY/MM/DD"}
                                    defaultValue={dayjs(
                                        rangeDate ? rangeDate[0] : undefined,
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                noStyle
                            >
                                <TimePicker.RangePicker
                                    style={{
                                        width: 240,
                                    }}
                                    format={"HH:mm"}
                                    minuteStep={15}
                                />
                            </Form.Item>
                        </div>
                    )}
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
