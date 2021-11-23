import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import {
    useCan,
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
} from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type ShowButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * `<ShowButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the show page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/show-button} for more details.
 */
export const ShowButton: FC<ShowButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    ...rest
}) => {
    const resourceWithRoute = useResourceWithRoute();

    const { show } = useNavigation();

    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(routeResourceName);

    const resourceName = propResourceName ?? resource.name;

    const id = recordItemId ?? idFromRoute;

    const { data } = useCan({
        resource: resourceName,
        action: "show",
        params: { id },
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
    });

    return (
        <Button
            onClick={(): void => show(routeResourceName, id)}
            icon={<EyeOutlined />}
            disabled={data?.can === false}
            title={
                data?.reason ??
                translate(
                    "buttons.notAccessTitle",
                    "You don't have permission to access",
                )
            }
            {...rest}
        >
            {!hideText && (children ?? translate("buttons.show", "Show"))}
        </Button>
    );
};
