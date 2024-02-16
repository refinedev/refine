import React, { useEffect } from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { useLocation } from "@docusaurus/router";
import { PageMetadata } from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import ErrorPageContent from "@theme/ErrorPageContent";
import LayoutProvider from "@theme/Layout/Provider";
import SkipToContent from "@theme/SkipToContent";
import { LivePreviewProvider } from "../components/live-preview-context";
import useIsMobile from "../hooks/use-is-mobile";
import clsx from "clsx";
import { VideoModal15K } from "../components/video-modal-15k";

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

    useEffect(() => {
        if (isMobile) {
            window?.Intercom?.("update", { hide_default_launcher: true });
        }
    }, [isMobile]);

    return (
        <LayoutProvider>
            <PageMetadata title={title} description={description} />
            <SkipToContent />
            <div
                className={clsx(
                    "main-wrapper",
                    "min-h-[100dvh]",
                    "flex flex-col",
                    "dark:bg-gray-900 bg-gray-0",
                )}
            >
                <ErrorBoundary
                    fallback={(params) => <ErrorPageContent {...params} />}
                >
                    <LivePreviewProvider>{children}</LivePreviewProvider>
                </ErrorBoundary>
                <VideoModal15K />
            </div>
        </LayoutProvider>
    );
};
