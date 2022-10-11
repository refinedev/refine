import React from "react";
import { RefineCrudCreateProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    Card,
    CardProps,
    Group,
    GroupProps,
    ActionIcon,
    Stack,
    Title,
} from "@mantine/core";
import {
    ResourceRouterParams,
    useNavigation,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import { IconArrowLeft } from "@tabler/icons";

import { SaveButton, SaveButtonProps } from "@components/buttons";
import { Breadcrumb } from "@components/breadcrumb";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    GroupProps,
    GroupProps,
    CardProps,
    GroupProps,
    BoxProps
>;

export const Create: React.FC<CreateProps> = (props) => {
    const {
        children,
        saveButtonProps,
        isLoading,
        resource: resourceFromProps,
        footerButtons: footerButtonsFromProps,
        footerButtonProps,
        headerButtons: headerButtonsFromProps,
        headerButtonProps,
        wrapperProps,
        contentProps,
        headerProps,
        goBack: goBackFromProps,
        breadcrumb = <Breadcrumb />,
        title,
    } = props;
    const translate = useTranslate();

    const { goBack } = useNavigation();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, action: routeFromAction } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const defaultFooterButtons = (
        <SaveButton
            {...(isLoading ? { disabled: true } : {})}
            {...saveButtonProps}
        />
    );

    const buttonBack =
        typeof goBackFromProps !== "undefined" ? (
            goBackFromProps
        ) : (
            <ActionIcon onClick={routeFromAction ? goBack : undefined}>
                <IconArrowLeft />
            </ActionIcon>
        );

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                  defaultButtons: null,
              })
            : headerButtonsFromProps
        : null;

    const footerButtons = footerButtonsFromProps
        ? typeof footerButtonsFromProps === "function"
            ? footerButtonsFromProps({ defaultButtons: defaultFooterButtons })
            : footerButtonsFromProps
        : defaultFooterButtons;

    return (
        <Card p="md" {...wrapperProps}>
            <Group position="apart" align="center" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumb}
                    <Group spacing="xs">
                        {buttonBack}
                        {title ?? (
                            <Title order={3} transform="capitalize">
                                {translate(
                                    `${resource.name}.titles.create`,
                                    `Create ${userFriendlyResourceName(
                                        resource.label ?? resource.name,
                                        "singular",
                                    )}`,
                                )}
                            </Title>
                        )}
                    </Group>
                </Stack>
                <Group spacing="xs" {...headerButtonProps}>
                    {headerButtons}
                </Group>
            </Group>
            <Box pt="sm" {...contentProps}>
                {children}
            </Box>
            <Group position="right" spacing="xs" mt="md" {...footerButtonProps}>
                {footerButtons}
            </Group>
        </Card>
    );
};
