import React, { FC, ReactNode, useCallback, useMemo } from "react";
import { Group, Title, TitleProps } from "@mantine/core";
import {
    ResourceRouterParams,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
    IResourceComponents,
} from "@pankod/refine-core";

type ResourceComponentType = keyof IResourceComponents;

export interface PageTitleProps extends TitleProps {
    title?: string;
    type?: ResourceComponentType;
    buttonBack?: ReactNode;
}

export const PageTitle: FC<PageTitleProps> = ({
    title,
    buttonBack,
    type = "list",
    ...props
}) => {
    const translate = useTranslate();

    const { useParams } = useRouterContext();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(routeResourceName);

    const getSuffix = useCallback((resourceType: ResourceComponentType) => {
        switch (resourceType) {
            case "list":
                return "";
            case "show":
                return "Show ";
            case "edit":
                return "Edit ";
            case "create":
                return "Create ";

            default:
                return "";
        }
    }, []);

    const text = useMemo(() => {
        const suffix = getSuffix(type);
        const textType = type === "list" ? "plural" : "singular";

        return (
            title ??
            translate(
                `${resource.name}.titles.${type}`,
                `${suffix}${userFriendlyResourceName(
                    resource.label ?? resource.name,
                    textType,
                )}`,
            )
        );
    }, [translate, title, userFriendlyResourceName]);

    return (
        <Title order={5} size="h2" transform="capitalize" {...props}>
            <Group spacing="md">
                {buttonBack}
                {text}
            </Group>
        </Title>
    );
};
