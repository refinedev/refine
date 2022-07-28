import React from "react";
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineEditButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

export type EditButtonProps = RefineEditButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
         */
        resourceName?: string;
    }
>;

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

    const { editUrl: generateEditUrl } = useNavigation();
    const { Link } = useRouterContext();

    const { resourceName, id, resource } = useResource({
        resourceName: propResourceName,
        resourceNameOrRouteName: propResourceNameOrRouteName,
        recordItemId,
    });

    const { data } = useCan({
        resource: resourceName,
        action: "edit",
        params: { id, resource },
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

    const editUrl = generateEditUrl(propResourceName ?? resource.route!, id!);

    return (
        <Link
            to={editUrl}
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
                data-testid={RefineButtonTestIds.EditButton}
                {...rest}
            >
                {!hideText && (children ?? translate("buttons.edit", "Edit"))}
            </Button>
        </Link>
    );
};
