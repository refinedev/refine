import React from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import {
    useNavigation,
    useTranslate,
    useCan,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineCreateButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

export type CreateButtonProps = RefineCreateButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
         */
        resourceName?: string;
    }
>;

/**
 * <CreateButton> uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/create-button} for more details.
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
    resourceName: propResourceName,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    onClick,
    ...rest
}) => {
    const translate = useTranslate();

    const { Link } = useRouterContext();

    const { createUrl: generateCreateUrl } = useNavigation();

    const { resourceName, resource } = useResource({
        resourceName: propResourceName,
        resourceNameOrRouteName: propResourceNameOrRouteName,
    });

    const { data } = useCan({
        resource: resourceName,
        action: "create",
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
        },
        params: {
            resource,
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

    const createUrl = generateCreateUrl(propResourceName ?? resource.route!);

    return (
        <Link
            to={createUrl}
            replace={false}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            <Button
                icon={<PlusSquareOutlined />}
                disabled={data?.can === false}
                title={createButtonDisabledTitle()}
                data-testid={RefineButtonTestIds.CreateButton}
                {...rest}
            >
                {!hideText &&
                    (children ?? translate("buttons.create", "Create"))}
            </Button>
        </Link>
    );
};
