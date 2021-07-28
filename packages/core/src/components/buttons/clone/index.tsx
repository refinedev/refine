import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type CloneButtonProps = ButtonProps & {
    /**
     * Determines which resource to use for redirection
     * @default Resource name that it reads from route
     */
    resourceName?: string;
    /**
     * Adds `id` to the end of the URL
     * @default Record id that it reads from route
     */
    recordItemId?: string;
};

/**
 * `<CloneButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation#clone clone} method from {@link https://refine.dev/docs/api-references/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of {@link https://refine.dev/docs/api-references/components/resource `<Resource>`}.
 */
export const CloneButton: FC<CloneButtonProps> = ({
    resourceName,
    recordItemId,
    children,
    ...rest
}) => {
    const { push } = useNavigation();
    const translate = useTranslate();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const onButtonClick = () => {
        push(
            `/resources/${resourceName ?? routeResourceName}/create/${
                recordItemId ?? idFromRoute
            }`,
        );
    };

    return (
        <Button onClick={onButtonClick} icon={<PlusSquareOutlined />} {...rest}>
            {children ?? translate("buttons.clone", "Clone")}
        </Button>
    );
};
