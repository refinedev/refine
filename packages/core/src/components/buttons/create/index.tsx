import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

import { useNavigation, useRouterContext, useTranslate, useCan } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

export type CreateButtonProps = ButtonProps & {
    resourceName?: string;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * <CreateButton> uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/create-button} for more details.
 */
export const CreateButton: FC<CreateButtonProps> = ({
    resourceName,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();
    const { create } = useNavigation();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = resourceName ?? routeResourceName;
    const onButtonClick = () => create(resource, "push");

    const { data } = useCan(
        { resource, action: "create" },
        {
            enabled: !ignoreAccessControlProvider,
        },
    );

    return (
        <Button
            onClick={onButtonClick}
            icon={<PlusSquareOutlined />}
            disabled={data === false}
            title={data === false ? "Dont have access" : ""}
            {...rest}
        >
            {!hideText && (children ?? translate("buttons.create", "Create"))}
        </Button>
    );
};
