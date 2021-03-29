import React, { FC } from "react";
import { Tabs, TabPaneProps, Typography } from "antd";
import humanizeString from "humanize-string";

import { BaseRecord } from "@interfaces";

const { Title } = Typography;

const { TabPane } = Tabs;

type TabProps = TabPaneProps & {
    record?: BaseRecord;
};

export const Tab: FC<TabProps> = ({ record, children, ...rest }) => {
    const renderChildrenWithPropsAndLabel = () => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return (
                    <>
                        <Title level={5}>
                            {humanizeString(child?.props.renderRecordKey)}
                        </Title>
                        {React.cloneElement(child, {
                            record,
                        })}
                    </>
                );
            }
            return child;
        });
    };
    return (
        <TabPane {...rest}>
            {record && renderChildrenWithPropsAndLabel()}
        </TabPane>
    );
};
