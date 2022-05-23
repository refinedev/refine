import React from "react";
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
    useCan,
    useNavigation,
    useTranslate,
    BaseKey,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";

export type EditButtonProps = ButtonProps & {
    /**
     * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
     */
    resourceName?: string;
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
    hideText?: boolean;
    ignoreAccessControlProvider?: boolean;
};

/**
 * `<EditButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/edit-button} for more details.
 */
export const EditButton: React.FC<EditButtonProps> = ({
    resourceName: propResourceName,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    onClick,
    ...rest
}) => {
    const translate = useTranslate();

    const { editUrl } = useNavigation();
    const { Link } = useRouterContext();

    const { resourceName, id, resource } = useResource({
        resourceName: propResourceName,
        resourceNameOrRouteName: propResourceNameOrRouteName,
        recordItemId,
    });

    const { data } = useCan({
        resource: resourceName,
        action: "edit",
        params: { id },
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
        <Link
            to={editUrl(propResourceName ?? resource.route!, id!)}
            replace={false}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            <Button
                icon={<EditOutlined />}
                disabled={data?.can === false}
                title={createButtonDisabledTitle()}
                {...rest}
            >
                {!hideText && (children ?? translate("buttons.edit", "Edit"))}
            </Button>
        </Link>
    );
};
