import React from "react";
import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

export const RichtextField: React.FC<BaseFieldProps> = ({
    value,
    record,
    renderRecordKey,
}) => {
    const recordValue = renderFieldRecord({ value, record, renderRecordKey });

    return <div dangerouslySetInnerHTML={{ __html: recordValue }} />;
};
