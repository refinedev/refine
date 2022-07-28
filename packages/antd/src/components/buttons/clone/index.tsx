import React from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineCloneButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

export type CloneButtonProps = RefineCloneButtonProps<
    ButtonProps,
    {
        /**
         * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
         */
        resourceName?: string;
    }
>;

/**
 * `<CloneButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button} for more details.
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
    resourceName: propResourceName,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    children,
    onClick,
    ...rest
}) => {
    const { cloneUrl: generateCloneUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { id, resourceName, resource } = useResource({
        resourceNameOrRouteName: propResourceNameOrRouteName,
        recordItemId,
        resourceName: propResourceName,
    });

    const { data } = useCan({
        resource: resourceName,
        action: "create",
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

    const cloneUrl = generateCloneUrl(propResourceName ?? resource.route!, id!);

    return (
        <Link
            to={cloneUrl}
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
                data-testid={RefineButtonTestIds.CloneButton}
                {...rest}
            >
                {!hideText && (children ?? translate("buttons.clone", "Clone"))}
            </Button>
        </Link>
    );
};
