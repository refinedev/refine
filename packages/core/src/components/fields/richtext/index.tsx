import React from "react";
import { FieldProps } from "../../../interfaces";

export const RichtextField: React.FC<FieldProps<string>> = ({ value }) => {
    return <div dangerouslySetInnerHTML={{ __html: value }} />;
};
