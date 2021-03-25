import React from "react";
import { Image, ImageProps } from "antd";

import { BaseFieldProps } from "../../../interfaces/field";

import { renderFieldRecord } from "@definitions";

export type ImageFieldProps = BaseFieldProps &
    ImageProps & {
        imageTitle?: string;
    };

export const ImageField: React.FC<ImageFieldProps> = ({
    value,
    record,
    renderRecordKey,
    imageTitle,
    ...rest
}) => {
    return (
        <Image
            {...rest}
            src={renderFieldRecord({ value, record, renderRecordKey })}
            title={imageTitle}
        />
    );
};
