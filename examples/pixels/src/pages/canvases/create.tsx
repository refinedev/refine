import React from "react";
import {
    Button,
    Col,
    Input,
    Radio,
    Row,
    SaveButton,
    Typography,
} from "@pankod/refine-antd";
import { useForm, useGetIdentity, useNavigation } from "@pankod/refine-core";
import { DEFAULT_CANVAS_SIZE, getRandomName } from "utility";

export const CanvasCreate = () => {
    const { data: identity } = useGetIdentity();

    const [values, setValues] = React.useState(() => {
        const name = getRandomName();
        return {
            id: name.replace(/\s/g, "-").toLowerCase(),
            user_id: identity?.id,
            name,
            width: DEFAULT_CANVAS_SIZE,
            height: DEFAULT_CANVAS_SIZE,
        };
    });

    const { push } = useNavigation();

    const { onFinish } = useForm({
        redirect: "show",
    });

    return (
        <>
            <Row style={{ marginBottom: "24px" }}>
                <Col>
                    <Button onClick={(): void => push("/")}>Go Back</Button>
                </Col>
                <Col flex="1" style={{ textAlign: "center" }}>
                    <Typography.Title level={3}>Create Canvas</Typography.Title>
                </Col>
                <Col>
                    <Button disabled style={{ visibility: "hidden" }}>
                        Go Back
                    </Button>
                </Col>
            </Row>
            <Row gutter={16} style={{ maxWidth: 360, margin: "auto" }}>
                <Col span={24} style={{ marginBottom: 24 }}>
                    <Row gutter={16}>
                        <Col style={{ width: 70 }}>ID: </Col>
                        <Col flex={1}>
                            <Input value={values.id} disabled />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{ marginBottom: 24 }}>
                    <Row gutter={16}>
                        <Col style={{ width: 70 }}>Name: </Col>
                        <Col flex={1}>
                            <Input value={values.name} disabled />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{ marginBottom: 24 }}>
                    <Row gutter={16}>
                        <Col style={{ width: 70 }}>Size: </Col>
                        <Col flex={1}>
                            <Radio.Group
                                options={[10, 20, 30, 50, 70]}
                                onChange={({ target: { value } }) =>
                                    setValues((p) => ({
                                        ...p,
                                        height: value,
                                        width: value,
                                    }))
                                }
                                value={values.width}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{ marginBottom: 24 }}>
                    <Row gutter={16}>
                        <SaveButton
                            style={{ width: "100%" }}
                            onClick={() => {
                                onFinish(values);
                            }}
                        />
                    </Row>
                </Col>
            </Row>
        </>
    );
};
