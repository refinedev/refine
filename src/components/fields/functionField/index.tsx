import React from "react";

import { BaseFieldProps, BaseRecord } from "@interfaces";

export type FunctionFieldProps = BaseFieldProps & {
    render: (record?: BaseRecord, source?: string) => any;
};

export const FunctionField: React.FC<FunctionFieldProps> = ({
    record,
    source,
    render,
}) => {
    return <div>{render(record, source)}</div>;
};
