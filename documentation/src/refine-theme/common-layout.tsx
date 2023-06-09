import React, { useEffect, useMemo } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { useLocation } from "@docusaurus/router";
import { PageMetadata } from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import ErrorPageContent from "@theme/ErrorPageContent";
import LayoutProvider from "@theme/Layout/Provider";
import SkipToContent from "@theme/SkipToContent";
import GithubCTA from "../components/github-floating-cta";
import { LivePreviewProvider } from "../components/live-preview-context";
import useIsMobile from "../hooks/use-is-mobile";
import clsx from "clsx";

declare global {
    interface Window {
        Intercom: any;
    }
}

export const CommonLayout = (props: any) => {
    const { children, title, description } = props;

    useKeyboardNavigation();

    const location = useLocation();

    const isMobile = useIsMobile();

    React.useEffect(() => {
        if (typeof window !== "undefined" && !isMobile) {
            if (
                location.pathname.startsWith("/blog") ||
                location.pathname.startsWith("/")
            ) {
                window?.Intercom?.("update", { hide_default_launcher: true });
            } else {
                window?.Intercom?.("update", { hide_default_launcher: false });
            }
        }
    }, [location, isMobile]);

    const showGithubCta = useMemo(() => {
        if (location.pathname.startsWith("/docs")) {
            return false;
        }

        return true;
    }, [location, isMobile]);

    useEffect(() => {
        if (isMobile) {
            window?.Intercom?.("update", { hide_default_launcher: true });
        }
    }, [isMobile]);

    return (
        <LayoutProvider>
            <PageMetadata title={title} description={description} />
            <SkipToContent />
            <div className={clsx("main-wrapper", "dark:bg-gray-900 bg-white")}>
                <ErrorBoundary
                    fallback={(params) => <ErrorPageContent {...params} />}
                >
                    <LivePreviewProvider>{children}</LivePreviewProvider>
                </ErrorBoundary>
            </div>
            {/* {showGithubCta && <BrowserOnly>{() => <GithubCTA />}</BrowserOnly>} */}
        </LayoutProvider>
    );
};
