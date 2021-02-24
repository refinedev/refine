import React, { FC } from "react";
import { Typography, Tabs, TabsProps } from "antd";

import { BaseRecord } from "@interfaces";

type ShowTabProps = TabsProps & {
    record?: BaseRecord;
};

export const ShowTab: FC<ShowTabProps> = ({ children, record, ...rest }) => {
    const renderChildrenWithProps = () => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    record,
                });
            }
            return child;
        });
    };

    return <Tabs {...rest}>{record && renderChildrenWithProps()}</Tabs>;
};

export { Tab } from "./tab";
