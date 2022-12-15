import React from "react";
import clsx from "clsx";
import {
    HtmlClassNameProvider,
    ThemeClassNames,
    PageMetadata,
} from "@docusaurus/theme-common";
import {
    docVersionSearchTag,
    DocsSidebarProvider,
    DocsVersionProvider,
    useDocRouteMetadata,
} from "@docusaurus/theme-common/internal";
import DocPageLayout from "@theme/DocPage/Layout";
import NotFound from "@theme/NotFound";
import SearchMetadata from "@theme/SearchMetadata";
import { useTutorialConfig } from "../../hooks/use-tutorial-config";

function DocPageMetadata(props) {
    const { versionMetadata } = props;
    return (
        <>
            <SearchMetadata
                version={versionMetadata.version}
                tag={docVersionSearchTag(
                    versionMetadata.pluginId,
                    versionMetadata.version,
                )}
            />
            <PageMetadata>
                {versionMetadata.noIndex && (
                    <meta name="robots" content="noindex, nofollow" />
                )}
            </PageMetadata>
        </>
    );
}

export default function DocPage(props) {
    const { versionMetadata } = props;

    const currentDocRouteMetadata = useDocRouteMetadata(props);

    const {
        tutorial: { path_prefix },
    } = useTutorialConfig();

    if (!currentDocRouteMetadata) {
        return <NotFound />;
    }

    const fallbackSidebarName = Object.keys(versionMetadata.docsSidebars)[0];
    const fallbackSidebarItems =
        versionMetadata.docsSidebars[fallbackSidebarName];

    const isTutorial = props.location.pathname.startsWith(path_prefix);

    const { docElement, sidebarName, sidebarItems } = currentDocRouteMetadata;

    return (
        <>
            <DocPageMetadata {...props} />
            <HtmlClassNameProvider
                className={clsx(
                    // TODO: it should be removed from here
                    ThemeClassNames.wrapper.docsPages,
                    ThemeClassNames.page.docsDocPage,
                    props.versionMetadata.className,
                )}
            >
                <DocsVersionProvider version={versionMetadata}>
                    <DocsSidebarProvider
                        name={
                            isTutorial
                                ? sidebarName ?? fallbackSidebarName
                                : sidebarName
                        }
                        items={
                            isTutorial
                                ? sidebarItems ?? fallbackSidebarItems
                                : sidebarItems
                        }
                    >
                        <DocPageLayout>{docElement}</DocPageLayout>
                    </DocsSidebarProvider>
                </DocsVersionProvider>
            </HtmlClassNameProvider>
        </>
    );
}
