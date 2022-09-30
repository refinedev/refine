import React, { ReactNode } from "react";

import { RefineFieldEmailProps } from "@pankod/refine-ui-types";
import { Anchor, AnchorProps } from "@mantine/core";

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, AnchorProps>;

/**
 * This field is used to display email values. It uses the {@link https://mantine.dev/core/text/  `<Text>` }
 * and {@link https://mantine.dev/core/anchor/ <Anchor>`} components from Mantine.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/fields/email} for more details.
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Anchor href={`mailto:${value}`} {...rest}>
            {value}
        </Anchor>
    );
};
