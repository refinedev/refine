import React from "react";
import {
    useCan,
    useNavigation,
    useTranslate,
    useResource,
    useRouterContext,
} from "@pankod/refine-core";
import {
    RefineButtonTestIds,
    RefineShowButtonProps,
} from "@pankod/refine-ui-types";
import { Button, ButtonProps, SvgIconProps } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export type ShowButtonProps = RefineShowButtonProps<
    ButtonProps,
    {
        svgIconProps?: SvgIconProps;
    }
>;

/**
 * `<ShowButton>` uses uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when red sirecting the app to the show page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/show-button} for more details.
 */
export const ShowButton: React.FC<ShowButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    ignoreAccessControlProvider = false,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, id, resource } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const { showUrl: generateShowUrl } = useNavigation();
    const { Link } = useRouterContext();

    const translate = useTranslate();

    const { data } = useCan({
        resource: resourceName,
        action: "show",
        params: { id, resource },
        queryOptions: {
            enabled: !ignoreAccessControlProvider,
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

    const showUrl = generateShowUrl(resource.route!, id!);

    const { sx, ...restProps } = rest;

    return (
        <Link
            to={showUrl}
            replace={false}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            style={{ textDecoration: "none" }}
        >
            <Button
                disabled={data?.can === false}
                startIcon={
                    !hideText && <VisibilityOutlinedIcon {...svgIconProps} />
                }
                title={disabledTitle()}
                sx={{ minWidth: 0, ...sx }}
                data-testid={RefineButtonTestIds.ShowButton}
                {...restProps}
            >
                {hideText ? (
                    <VisibilityOutlinedIcon
                        fontSize="small"
                        {...svgIconProps}
                    />
                ) : (
                    children ?? translate("buttons.show", "Show")
                )}
            </Button>
        </Link>
    );
};
