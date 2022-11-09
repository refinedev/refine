import React from "react";

import { Alert, Row, Col } from "@pankod/refine-antd";

import { CreateGuesserConfig } from "@/types";

export const ErrorComponent: CreateGuesserConfig["errorComponent"] = ({
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
