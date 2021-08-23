import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import humanizeString from "humanize-string";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type ListButtonProps = ButtonProps & {
    resourceName?: string;
    hideText?: boolean;
};

/**
 * `<ListButton>` is using Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of {@link https://refine.dev/docs/api-references/components/resource `<Resource>`}.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/list-button} for more details.
 */
export const ListButton: FC<ListButtonProps> = ({
    resourceName: propResourceName,
    hideText = false,
    children,
    ...rest
}) => {
    const { list } = useNavigation();
    const translate = useTranslate();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void => list(resourceName, "push")}
            icon={<BarsOutlined />}
            {...rest}
        >
            {!hideText &&
                (children ??
                    translate(
                        `${resourceName}.titles.list`,
                        humanizeString(resourceName),
                    ))}
        </Button>
    );
};
