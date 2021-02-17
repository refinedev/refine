import React from "react";
import { Image, ImageProps } from "antd";

import { BaseFieldProps } from "@interfaces";

import { fieldContent } from "@definitions";

export type ImageFieldProps = BaseFieldProps &
    ImageProps & {
        imageTitle?: string;
    };

export const ImageField: React.FC<ImageFieldProps> = ({
    record,
    source,
    imageTitle,
    ...rest
}) => {
    return (
        <Image
            {...rest}
            src={fieldContent({ record, source })}
            title={imageTitle}
        />
    );
};
