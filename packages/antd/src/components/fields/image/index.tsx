import React from "react";
import { Image, ImageProps } from "antd";

import { FieldProps } from "../../../interfaces";

export type ImageFieldProps = FieldProps<string | undefined> &
    ImageProps & {
        imageTitle?: string;
    };

/**
 * This field is used to display images and uses {@link https://ant.design/components/image/#header `<Image>`} from Ant Design.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/image} for more details.
 */
export const ImageField: React.FC<ImageFieldProps> = ({
    value,
    imageTitle,
    ...rest
}) => {
    return <Image {...rest} src={value} title={imageTitle} />;
};
