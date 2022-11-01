import React, { ReactNode } from "react";

import { RefineFieldEmailProps } from "@pankod/refine-ui-types";
import { Link, LinkProps } from "@chakra-ui/react";

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

/**
 * This field is used to display email values. It uses the {@link https://mantine.dev/core/text/  `<Text>` }
 * and {@link https://mantine.dev/core/anchor/ <Anchor>`} components from Mantine.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/email} for more details.
 */
export const EmailField: React.FC<EmailFieldProps> = ({ value, ...rest }) => {
    return (
        <Link href={`mailto:${value}`} {...rest}>
            {value}
        </Link>
    );
};
