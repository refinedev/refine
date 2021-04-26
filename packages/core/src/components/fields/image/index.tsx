import React from "react";
import { Image, ImageProps } from "antd";

import { FieldProps } from "../../../interfaces";

export type ImageFieldProps = FieldProps<string | undefined> &
    ImageProps & {
        imageTitle?: string;
    };

export const ImageField: React.FC<ImageFieldProps> = ({
    value,
    imageTitle,
    ...rest
}) => {
    return <Image {...rest} src={value} title={imageTitle} />;
};
