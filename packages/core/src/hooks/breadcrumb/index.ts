import React from "react";
import humanizeString from "humanize-string";

import { useResource, useRouterContext } from "@hooks";
import { ResourceRouterParams } from "src/interfaces";

export type UseBreadcrumbPropsType = {};

export type BreadcrumbsType = {
    label: string;
    to?: string;
    icon?: React.ReactNode;
};

type UseBreadcrumbReturnType = {
    breadcrumbs: BreadcrumbsType[];
};

export const useBreadcrumb =
    ({}: UseBreadcrumbPropsType = {}): UseBreadcrumbReturnType => {
        const { useParams } = useRouterContext();
        const { resources, resource } = useResource();

        const { action } = useParams<ResourceRouterParams>();

        const breadcrumbs: BreadcrumbsType[] = [];

        resource.route?.split("/").forEach((route) => {
            const resource = resources.find(
                (resource) => resource.name === route,
            );

            if (resource) {
                breadcrumbs.push({
                    label: humanizeString(resource.label ?? resource.name),
                    to: !!resource.list ? `/${resource.route}` : undefined,
                    icon: resource.icon,
                });
            }
        });

        if (action) {
            breadcrumbs.push({ label: humanizeString(action) });
        }

        return {
            breadcrumbs,
        };
    };
