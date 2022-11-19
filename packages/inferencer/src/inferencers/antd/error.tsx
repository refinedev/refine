import React from "react";

import { Alert, Row, Col } from "@pankod/refine-antd";

import { CreateInferencerConfig } from "@/types";

export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
    error,
}) => {
    if (error) {
        return (
            <Row justify="center" align="middle" style={{ minHeight: "200px" }}>
                <Col>
                    <Alert
                        message="Error"
                        description={error ?? ""}
                        type="error"
                        showIcon
                    />
                </Col>
            </Row>
        );
    }

    return null;
};
