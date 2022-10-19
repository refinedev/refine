import React from "react";
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
import { Button, ButtonProps } from "@chakra-ui/react";
import { IconSquarePlus, TablerIconProps } from "@tabler/icons";

export type CreateButtonProps = RefineCreateButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
    }
>;

export const CreateButton: React.FC<CreateButtonProps> = ({
    resourceNameOrRouteName,
    hideText = false,
    ignoreAccessControlProvider = false,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resource, resourceName } = useResource({
        resourceNameOrRouteName,
    });

    const { Link } = useRouterContext();
    const { createUrl: generateCreateUrl } = useNavigation();

    const translate = useTranslate();

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

    const disabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const createUrl = generateCreateUrl(resource.route!);

    return (
        <Link
            to={createUrl}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            {hideText ? (
                <span>TODO: Icon Button</span>
            ) : (
                // <ActionIcon
                //     title={disabledTitle()}
                //     disabled={data?.can === false}
                //     {...(variant
                //         ? {
                //           }
                //         : { variant: "default" })}
                //     data-testid={RefineButtonTestIds.CreateButton}
                //     {...commonProps}
                // >
                //     <IconSquarePlus size={18} {...svgIconProps} />
                // </ActionIcon>
                <Button
                    disabled={data?.can === false}
                    leftIcon={<IconSquarePlus size={18} />}
                    title={disabledTitle()}
                    data-testid={RefineButtonTestIds.CreateButton}
                    colorScheme="primary"
                    {...rest}
                >
                    {children ?? translate("buttons.create", "Create")}
                </Button>
            )}
        </Link>
    );
};
