import React, { FC } from "react";
import { RefineCrudCreateProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    Card,
    CardProps,
    Group,
    GroupProps,
    ActionIcon,
    CenterProps,
    Center,
} from "@mantine/core";
import {
    ResourceRouterParams,
    useNavigation,
    useRouterContext,
} from "@pankod/refine-core";
import { PageTitle } from "@components/page-title";
import { Breadcrumb } from "@components/breadcrumb";
import { SaveButton, SaveButtonProps } from "@components/buttons";
import { ArrowLeft } from "tabler-icons-react";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    CenterProps,
    GroupProps,
    CardProps,
    GroupProps,
    BoxProps
>;

export const Create: FC<CreateProps> = (props) => {
    const {
        children,
        saveButtonProps,
        isLoading,
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

    const { goBack } = useNavigation();

    const { useParams } = useRouterContext();

    const { action: routeFromAction } = useParams<ResourceRouterParams>();

    const defaultFooterButtons = (
        <>
            <SaveButton loading={isLoading} {...saveButtonProps} />
        </>
    );

    const buttonBack =
        typeof goBackFromProps !== "undefined" ? (
            goBackFromProps
        ) : (
            <ActionIcon onClick={routeFromAction ? goBack : undefined}>
                <ArrowLeft />
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
        <Card p="lg" {...wrapperProps}>
            {breadcrumb}
            <Group position="apart" {...headerProps}>
                {title ?? <PageTitle type="create" buttonBack={buttonBack} />}
                {headerButtons && (
                    <Center {...headerButtonProps}>{headerButtons}</Center>
                )}
            </Group>
            <Box {...contentProps}>{children}</Box>
            <Group position="right" spacing="md" mt="xl" {...footerButtonProps}>
                {footerButtons}
            </Group>
        </Card>
    );
};
