import React, { ReactNode } from "react";

import { RefineFieldEmailProps } from "@pankod/refine-ui-types";
import { Link, LinkProps } from "@chakra-ui/react";

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

/**
 * This field is used to display email values. It uses the {@link https://chakra-ui.com/docs/components/text  `<Text>` }
 * and {@link https://chakra-ui.com/docs/components/link/usage <Link>`} components from Chakra UI.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/fields/email} for more details.
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Link href={`mailto:${value}`} {...rest}>
            {value}
        </Link>
    );
};
