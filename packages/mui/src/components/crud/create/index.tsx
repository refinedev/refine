import React from "react";

import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";
import { RefineCrudCreateProps } from "@pankod/refine-ui-types";

import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    IconButton,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    CardActionsProps,
    Typography,
    BoxProps,
    Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Breadcrumb, SaveButton, SaveButtonProps } from "@components";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    BoxProps,
    CardActionsProps,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    {
        /**
         * @deprecated use `headerButtons` or `footerButtons` instead.
         */
        actionButtons?: React.ReactNode;
        /**
         * @deprecated use `wrapperProps` instead.
         */
        cardProps?: CardProps;
        /**
         * @deprecated use `headerProps` instead.
         */
        cardHeaderProps?: CardHeaderProps;
        /**
         * @deprecated use `contentProps` instead.
         */
        cardContentProps?: CardContentProps;
        /**
         * @deprecated use `footerButtonProps` instead.
         */
        cardActionsProps?: CardActionsProps;
    }
>;

/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/create} for more details.
 */
export const Create: React.FC<CreateProps> = ({
    title,
    actionButtons,
    children,
    saveButtonProps,
    resource: resourceFromProps,
    isLoading = false,
    cardProps,
    cardHeaderProps,
    cardContentProps,
    cardActionsProps,
    breadcrumb = <Breadcrumb />,
    wrapperProps,
    headerProps,
    contentProps,
    headerButtonProps,
    headerButtons,
    footerButtonProps,
    footerButtons,
    goBack: goBackFromProps,
}) => {
    const { goBack } = useNavigation();

    const translate = useTranslate();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, action: routeFromAction } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const defaultFooterButtons = (
        <SaveButton loading={isLoading} {...saveButtonProps} />
    );

    return (
        <Card {...(cardProps ?? {})} {...(wrapperProps ?? {})}>
            {breadcrumb}
            <CardHeader
                sx={{ display: "flex", flexWrap: "wrap" }}
                title={
                    title ?? (
                        <Typography variant="h5">
                            {translate(
                                `${resource.name}.titles.create`,
                                `Create ${userFriendlyResourceName(
                                    resource.label ?? resource.name,
                                    "singular",
                                )}`,
                            )}
                        </Typography>
                    )
                }
                avatar={
                    typeof goBackFromProps !== "undefined" ? (
                        goBackFromProps
                    ) : (
                        <IconButton
                            onClick={routeFromAction ? goBack : undefined}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )
                }
                action={
                    headerButtons ? (
                        <Box
                            display="flex"
                            gap="16px"
                            {...(headerButtonProps ?? {})}
                        >
                            {headerButtons
                                ? typeof headerButtons === "function"
                                    ? headerButtons({
                                          defaultButtons: null,
                                      })
                                    : headerButtons
                                : null}
                        </Box>
                    ) : undefined
                }
                {...(cardHeaderProps ?? {})}
                {...(headerProps ?? {})}
            />
            <CardContent
                {...(cardContentProps ?? {})}
                {...(contentProps ?? {})}
            >
                {children}
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "16px",
                    padding: "16px",
                }}
                {...(cardActionsProps ?? {})}
                {...(footerButtonProps ?? {})}
            >
                {footerButtons
                    ? typeof footerButtons === "function"
                        ? footerButtons({
                              defaultButtons: defaultFooterButtons,
                          })
                        : footerButtons
                    : actionButtons
                    ? actionButtons
                    : defaultFooterButtons}
            </CardActions>
        </Card>
    );
};
