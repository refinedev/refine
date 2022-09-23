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
import { Anchor, Button, ButtonProps } from "@mantine/core";
import { SquarePlus, IconProps } from "tabler-icons-react";

export type CreateButtonProps = RefineCreateButtonProps<
    ButtonProps,
    {
        svgIconProps?: IconProps;
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
        <Anchor
            component={Link}
            to={createUrl}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            <Button
                disabled={data?.can === false}
                leftIcon={
                    !hideText && <SquarePlus size={16} {...svgIconProps} />
                }
                title={disabledTitle()}
                data-testid={RefineButtonTestIds.CreateButton}
                variant="default"
                {...rest}
            >
                {hideText ? (
                    <SquarePlus size={16} {...svgIconProps} />
                ) : (
                    children ?? translate("buttons.create", "Create")
                )}
            </Button>
        </Anchor>
    );
};
