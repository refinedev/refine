import React from "react";
import {
    useBreadcrumb,
    useLink,
    useRefineContext,
    useRouterContext,
    useRouterType,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";

import {
    Text,
    Breadcrumbs,
    BreadcrumbsProps as MantineBreadcrumbProps,
    Anchor,
    Group,
} from "@mantine/core";
import { IconHome } from "@tabler/icons";

export type BreadcrumbProps = RefineBreadcrumbProps<MantineBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    breadcrumbProps,
    showHome = true,
    hideIcons = false,
    home,
}) => {
    const routerType = useRouterType();
    const { breadcrumbs } = useBreadcrumb();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const { hasDashboard } = useRefineContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    if (breadcrumbs.length === 1) {
        return null;
    }

    const renderHome = () => {
        if (home) {
            return (
                <Anchor
                    component={ActiveLink as any}
                    color="dimmed"
                    to={home.path ?? "/"}
                >
                    {typeof home.icon !== "undefined" ? (
                        home.icon
                    ) : (
                        <IconHome size={18} />
                    )}
                </Anchor>
            );
        }
        return null;
    };

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            styles={{
                separator: { marginRight: 8, marginLeft: 8, color: "dimgray" },
            }}
            {...breadcrumbProps}
        >
            {showHome && hasDashboard && (
                <Anchor component={ActiveLink as any} color="dimmed" to="/">
                    <IconHome size={18} />
                </Anchor>
            )}
            {renderHome()}
            {breadcrumbs.map(({ label, icon, href }) => {
                return (
                    <Group key={label} spacing={4} align="center" noWrap>
                        {!hideIcons && icon}
                        {href ? (
                            <Anchor
                                component={ActiveLink as any}
                                color="dimmed"
                                to={href}
                                size="sm"
                            >
                                {label}
                            </Anchor>
                        ) : (
                            <Text color="dimmed" size="sm">
                                {label}
                            </Text>
                        )}
                    </Group>
                );
            })}
        </Breadcrumbs>
    );
};
