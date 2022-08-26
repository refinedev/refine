import React, { useContext } from "react";
import warnOnce from "warn-once";

import { useResource, useRouterContext, useTranslate } from "@hooks";
import { TranslationContext } from "@contexts/translation";
import { humanizeString } from "@definitions";

import { ResourceRouterParams } from "../../interfaces";

export type BreadcrumbsType = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
};

type UseBreadcrumbReturnType = {
    breadcrumbs: BreadcrumbsType[];
};

export const useBreadcrumb = (): UseBreadcrumbReturnType => {
    const { useParams } = useRouterContext();
    const { i18nProvider } = useContext(TranslationContext);

    const translate = useTranslate();

    const { resources, resource } = useResource();

    const { action } = useParams<ResourceRouterParams>();

    const breadcrumbs: BreadcrumbsType[] = [];

    if (!resource?.name) {
        return { breadcrumbs };
    }

    const addBreadcrumb = (parentName: string) => {
        const parentResource = resources.find(
            (resource) => resource.name === parentName,
        );

        if (parentResource) {
            if (parentResource.parentName) {
                addBreadcrumb(parentResource.parentName);
            }
            breadcrumbs.push({
                label:
                    parentResource.label ??
                    translate(
                        `${parentResource.name}.${parentResource.name}`,
                        humanizeString(parentResource.name),
                    ),

                href: !!parentResource.list
                    ? `/${parentResource.route}`
                    : undefined,
                icon: parentResource.icon,
            });
        }
    };

    if (resource.parentName) {
        addBreadcrumb(resource.parentName);
    }

    breadcrumbs.push({
        label:
            resource.label ??
            translate(
                `${resource.name}.${resource.name}`,
                humanizeString(resource.name),
            ),
        href: !!resource.list ? `/${resource.route}` : undefined,
        icon: resource.icon,
    });

    if (action) {
        const key = `actions.${action}`;
        const actionLabel = translate(key);
        if (typeof i18nProvider !== "undefined" && actionLabel === key) {
            warnOnce(
                true,
                `[useBreadcrumb]: Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file.\nFor more information, see https://refine.dev/docs/core/hooks/useBreadcrumb/#i18n-support`,
            );
            breadcrumbs.push({
                label: translate(`buttons.${action}`, humanizeString(action)),
            });
        } else {
            breadcrumbs.push({
                label: translate(key, humanizeString(action)),
            });
        }
    }

    return {
        breadcrumbs,
    };
};
