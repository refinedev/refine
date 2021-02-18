import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Typography } from "antd";

import { DataContext } from "@contexts/data";
import { GetOneResponse, IDataContext } from "@interfaces";
import { renderFieldRecord } from "@definitions";
import { BaseFieldProps } from "../../../interfaces/field";

export interface ReferenceFieldProps extends BaseFieldProps {
    resource: string;
}

export const ReferenceField: React.FC<ReferenceFieldProps> = ({
    resource,
    value,
    renderRecordKey = "title",
}) => {
    const { getOne } = useContext<IDataContext>(DataContext);

    const { data, isFetching } = useQuery<GetOneResponse>(
        [`resource/one/${resource}/`, { id: value }],
        () => getOne(resource, Number(value)),
    );

    const { Text } = Typography;

    if (isFetching) {
        // TODO: Add loding ui.
        return <Text>loading</Text>;
    }

    if (!data) {
        return <Text>{value}</Text>;
    }

    return (
        <Text>
            {renderFieldRecord({ value, record: data.data, renderRecordKey })}
        </Text>
    );
};
