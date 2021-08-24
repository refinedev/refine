import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type EditButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
    hideText?: boolean;
};

/**
 * `<EditButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of {@link https://refine.dev/docs/api-references/components/resource `<Resource>`}.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/edit-button} for more details.
 */
export const EditButton: FC<EditButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const { edit } = useNavigation();

    const id = recordItemId ?? idFromRoute;

    return (
        <Button
            onClick={(): void => {
                edit(resourceName, id);
            }}
            icon={<EditOutlined />}
            {...rest}
        >
            {!hideText && (children ?? translate("buttons.edit", "Edit"))}
        </Button>
    );
};
