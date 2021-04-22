import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Typography } from "antd";

import { useTranslate } from "@hooks";
import { DataContext } from "@contexts/data";

import { GetOneResponse, IDataContext } from "../../../interfaces";
import { FieldProps } from "../../../interfaces";

export type ReferenceFieldProps = FieldProps<string> & {
    resource: string;
};

export const ReferenceField: React.FC<ReferenceFieldProps> = ({
    resource,
    value,
    children,
}) => {
    const { getOne } = useContext<IDataContext>(DataContext);

    const { data, isFetching } = useQuery<GetOneResponse>(
        [`resource/one/${resource}/`, { id: value }],
        () => getOne(resource, value),
    );

    const translate = useTranslate();

    const { Text } = Typography;

    if (isFetching) {
        // TODO: Add loding ui.
        return <Text>{translate("common:loading", "loading")}</Text>;
    }

    if (!data) {
        return <Text>{value}</Text>;
    }

    if (value) {
        return <Text>value</Text>;
    }

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                value,
                record: data?.data,
            });
        }
        return child;
    });

    return <>{childrenWithProps}</>;
};
