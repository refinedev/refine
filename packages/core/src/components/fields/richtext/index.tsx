import React from "react";
import { FieldProps } from "../../../interfaces";

export const RichtextField: React.FC<FieldProps> = ({ value }) => {
    return <div dangerouslySetInnerHTML={{ __html: value }} />;
};
