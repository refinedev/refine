import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

export type CreateButtonProps = ButtonProps & {
    resourceName?: string;
    hideText?: boolean;
};

/**
 * <CreateButton> uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of {@link https://refine.dev/docs/api-references/components/resource `<Resource>`}.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/create-button} for more details.
 */
export const CreateButton: FC<CreateButtonProps> = ({
    resourceName,
    hideText = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();
    const { create } = useNavigation();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const onButtonClick = () => {
        create(resourceName ?? routeResourceName, "push");
    };

    return (
        <Button onClick={onButtonClick} icon={<PlusSquareOutlined />} {...rest}>
            {!hideText && (children ?? translate("buttons.create", "Create"))}
        </Button>
    );
};
