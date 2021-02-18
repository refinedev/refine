import React from "react";
import { Image, ImageProps } from "antd";

import { BaseFieldProps } from "@interfaces";

import { fieldContent } from "@definitions";

export type DateFieldProps = BaseFieldProps;

export const DateField: React.FC<DateFieldProps> = ({
    record,
    source,
    ...rest
}) => {
    return (
        /*   <Image
            {...rest}
            src={fieldContent({ record, source })}
            title={imageTitle}
        />
 */
        <div className="">test date</div>
        <div className="">{fieldContent({ record, source })}</div>
    );
};
