import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type CloneButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
    hideText?: boolean;
};

/**
 * `<CloneButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of {@link https://refine.dev/docs/api-references/components/resource `<Resource>`}.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/clone-button} for more details.
 */
export const CloneButton: FC<CloneButtonProps> = ({
    resourceName,
    recordItemId,
    hideText = false,
    children,
    ...rest
}) => {
    const { clone } = useNavigation();
    const translate = useTranslate();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const onButtonClick = () => {
        clone(resourceName ?? routeResourceName, recordItemId ?? idFromRoute);
    };

    return (
        <Button onClick={onButtonClick} icon={<PlusSquareOutlined />} {...rest}>
            {!hideText && (children ?? translate("buttons.clone", "Clone"))}
        </Button>
    );
};
