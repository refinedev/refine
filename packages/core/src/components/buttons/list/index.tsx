import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { BarsOutlined } from "@ant-design/icons";

import {
    useCan,
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
} from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";
import { userFriendlyResourceName } from "@definitions";

type ListButtonProps = ButtonProps & {
    resourceName?: string;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * `<ListButton>` is using Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/list-button} for more details.
 */
export const ListButton: FC<ListButtonProps> = ({
    resourceName: propResourceName,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    ...rest
}) => {
    const resourceWithRoute = useResourceWithRoute();

    const { list } = useNavigation();
    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(routeResourceName);

    const resourceName = propResourceName ?? resource.name;

    const { data } = useCan({
        resource: resourceName,
        action: "list",
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    const createButtonDisabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    return (
        <Button
            onClick={(): void => list(resourceName, "push")}
            icon={<BarsOutlined />}
            disabled={data?.can === false}
            title={createButtonDisabledTitle()}
            {...rest}
        >
            {!hideText &&
                (children ??
                    translate(
                        `${resourceName}.titles.list`,
                        userFriendlyResourceName(
                            resource.label ?? resourceName,
                            "plural",
                        ),
                    ))}
        </Button>
    );
};
