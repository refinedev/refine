import React from "react";

import { Spin, Row, Col } from "@pankod/refine-antd";

import { CreateInferencerConfig } from "@/types";

export const LoadingComponent: CreateInferencerConfig["loadingComponent"] =
    () => {
        return (
            <Row justify="center" align="middle" style={{ minHeight: "300px" }}>
                <Col>
                    <Spin size="large" />
                </Col>
            </Row>
        );
    };
