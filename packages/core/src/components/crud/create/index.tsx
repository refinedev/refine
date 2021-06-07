import React from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Space,
    ButtonProps,
    PageHeader,
    PageHeaderProps,
    Tag,
    Row,
    Col,
    Result,
} from "antd";
import pluralize from "pluralize";

import {
    useNavigation,
    useResourceWithRoute,
    useTranslate,
    useAllow,
} from "@hooks";
import { SaveButton } from "@components";
import { OptionalComponent } from "@definitions";

import { ResourceRouterParams } from "../../../interfaces";
export interface CreateProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
    aside?: React.FC;
}

export const Create: React.FC<CreateProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    children,
    pageHeaderProps,
    resource: resourceFromProps,
    aside,
}) => {
    const { goBack } = useNavigation();
    const translate = useTranslate();

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName ?? resourceFromProps);
    const { canAllow } = useAllow("allowCreate", resource.name);

    const tags = [];
    if (idFromRoute) {
        tags.push(
            <Tag
                key={`${resource.name}-${idFromRoute}-create-clone-tag`}
                color="blue"
            >
                {translate("tags.clone", "Clone")}
            </Tag>,
        );
    }

    return (
        <>
            {canAllow ? (
                <Row gutter={[16, 16]}>
                    <Col flex="1 1 200px">
                        <PageHeader
                            ghost={false}
                            onBack={routeFromAction ? goBack : undefined}
                            tags={tags}
                            title={
                                title ??
                                translate(
                                    `${resource.name}.titles.create`,
                                    `Create ${pluralize.singular(
                                        resource.name,
                                    )}`,
                                )
                            }
                            {...pageHeaderProps}
                        >
                            <Card
                                actions={[
                                    <Space
                                        key="action-buttons"
                                        style={{
                                            float: "right",
                                            marginRight: 24,
                                        }}
                                    >
                                        {actionButtons ?? (
                                            <SaveButton
                                                {...saveButtonProps}
                                                htmlType="submit"
                                            />
                                        )}
                                    </Space>,
                                ]}
                            >
                                {children}
                            </Card>
                        </PageHeader>
                    </Col>

                    {aside && (
                        <Col flex="0 1 300px">
                            <OptionalComponent optional={aside} />
                        </Col>
                    )}
                </Row>
            ) : (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                />
            )}
        </>
    );
};
