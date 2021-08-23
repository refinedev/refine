import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type ShowButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
    hideText?: boolean;
};

/**
 * `<ShowButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the show page with the record id route of {@link https://refine.dev/docs/api-references/components/resource `<Resource>`}.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/show-button} for more details.
 */
export const ShowButton: FC<ShowButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    children,
    ...rest
}) => {
    const { show } = useNavigation();
    const translate = useTranslate();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void =>
                show(resourceName, recordItemId ?? idFromRoute)
            }
            icon={<EyeOutlined />}
            {...rest}
        >
            {!hideText && (children ?? translate("buttons.show", "Show"))}
        </Button>
    );
};
