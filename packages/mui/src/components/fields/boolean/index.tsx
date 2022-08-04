import React from "react";

import { RefineFieldBooleanProps } from "@pankod/refine-ui-types";
import { Tooltip, TooltipProps, SvgIconProps } from "@mui/material";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";

export type BooleanFieldProps = RefineFieldBooleanProps<
    unknown,
    Omit<TooltipProps, "title" | "children">,
    { svgIconProps?: SvgIconProps }
>;

/**
 * This field is used to display boolean values. It uses the {@link https://mui.com/material-ui/react-tooltip/#main-content `<Tooltip>`} values from Materila UI.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/boolean} for more details.
 */
export const BooleanField: React.FC<BooleanFieldProps> = ({
    value,
    valueLabelTrue = "true",
    valueLabelFalse = "false",
    trueIcon,
    falseIcon,
    svgIconProps,
    ...rest
}) => {
    return (
        <Tooltip title={value ? valueLabelTrue : valueLabelFalse} {...rest}>
            {value ? (
                <span>{trueIcon ?? <CheckOutlined {...svgIconProps} />}</span>
            ) : (
                <span>{falseIcon ?? <CloseOutlined {...svgIconProps} />}</span>
            )}
        </Tooltip>
    );
};
